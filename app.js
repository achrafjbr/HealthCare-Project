/* General variables*/
const lenghtPaginationPage = 4;
let currentPage = 1; // pagination start
let patientList = []; // list that contains all patients.
//let currentPagePointer = 4;
//let previousPagePointer = 0;
let previousPointer = 0;
let nextPointer = 4;
let isPaginationClicked = false;

let totalPages = patientList.length;

/* Patient form section (left side part in HTML) */

const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const telInput = document.getElementById("tel");
const emailInput = document.getElementById("email");
const motifInput = document.getElementById("motif");
const preferedDateInput = document.getElementById("prefered-date");
// Submition form element
const submitFormButton = document.querySelector("#form");
// Elements which are responsible for showing error or success message.
const popupMessage = document.querySelector(".message-popup");
const message = popupMessage.querySelector(".warning .message");
const successMessage = popupMessage.querySelector(".warning .success-img");
const messageHeaderColor = popupMessage.querySelector(".warning h3");
/// Submit form element.
submitFormButton.addEventListener("submit", (event) =>
  onSubmit(event, validate),
);

const addPatient = (patient) => {
  patientList.push(patient);
};
const showPopupTimeOut = (duration = 1000, callback) => {
  setTimeout(() => callback(), duration);
};

// Catch form error.
const validate = (error) => {
  // Set message to popup.
  message.innerText = `${error}`;
  // show popup for error message in 2second and close it auto.
  popupMessage.classList.remove("hide");
  popupMessage.classList.add("show");
  // Set error image:
  successMessage.src = "images/warning.png";
  showPopupTimeOut(2000, () => {
    popupMessage.classList.remove("show");
    popupMessage.classList.add("hide");
  });
};
// Submit the code, handling errors.
const onSubmit = (event, callback) => {
  // You can extend error as much as possible, by verify all champ, & using polymorphism for reduicing if statement.
  let errorMessage = "";
  event.preventDefault();

  if (
    nameInput.value == "" ||
    lastNameInput.value == "" ||
    telInput.value == "" ||
    emailInput.value == "" ||
    motifInput.value == "" ||
    preferedDateInput.value == ""
  ) {
    errorMessage = "Something went wrong";
    callback(errorMessage);
  } else {
    // Saving data as an object in [patientList].
    addPatient({
      id: Date.now(), // Unique id.
      name: nameInput.value,
      lastName: lastNameInput.value,
      telephone: telInput.value,
      email: emailInput.value,
      motif: motifInput.value,
      date: preferedDateInput.value,
    });
    // Set success image:
    successMessage.src = "images/success.png";
    // show popup for success message in 1second and close it auto.
    message.innerText = `Registration has been successfully`;
    // Change the header message color :
    messageHeaderColor.innerHTML = "Successfully";
    messageHeaderColor.style.color = "green";
    popupMessage.classList.remove("hide");
    popupMessage.classList.add("show");
    showPopupTimeOut(2000, () => {
      popupMessage.classList.remove("show");
      popupMessage.classList.add("hide");
    });
    // re-render the patient data in the right side.
    // Re-render the data again
    reRenderPatientData();
    //checkHowManyItemExist();
    // Change the parameters of pagination.
    console.log("THE LIST", patientList);
  }
};

/* Patients data section (rghit side part in HTML) */

//  - Drag each row of patient data for delete it.
const patientData = document.querySelector(".data");

patientData.addEventListener("drag", (event) => onDragStarting(event));

// Remove the Element when the drag achieved.
const onDragEnding = (selectedRow, e) => {
  e.preventDefault();
  selectedRow.remove();
  // Remove item from list of patient data.
  let patientId = selectedRow.dataset.id;
  patientList = patientList.filter((patient) => patient.id != patientId);
  console.log(patientList);
  // Re-render the data again
  reRenderPatientData();
  // Change the parameters of pagination.
  checkHowManyItemExist();
};
// Move or drag from L to R.
const onDragStarting = (event) => {
  let selectedRow = event.target.closest(".row");
  selectedRow.style.left += `${event.offsetX}px`;
  selectedRow.addEventListener("dragend", (e) => onDragEnding(selectedRow, e));
};

let filtringPatient = [];
// I'll develop it later.
const reRenderPatientData = (inFlitring) => {
  checkHowManyItemExist();
  patientData.innerHTML = "";
  patientList;
  inFlitring
    ? filtringPatient.forEach(
        ({ id, name, telephone, lastName, email, motif, date }, indx) => {
          if (indx < 4) {
            patientData.innerHTML += `<div class="row" draggable="true" data-id=${id}>
                        <section class="patient-data">
                            <p class="name">${name}</p>
                            <p class="last-name">${lastName}</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;
          }
        },
      )
    : patientList.forEach(
        ({ id, name, telephone, lastName, email, motif, date }, indx) => {
          if (indx < 4) {
            patientData.innerHTML += `<div class="row" draggable="true" data-id=${id}>
                        <section class="patient-data">
                            <p class="name">${name}</p>
                            <p class="last-name">${lastName}</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;
          }
        },
      );
};

/*

const renderingPatientView = ({
  id,
  name,
  telephone,
  lastName,
  email,
  motif,
  date,
}) => {
  const insidePatientDataElement = `<div class="row" draggable="true" data-id=${id}>
                        <section class="patient-data">
                            <p class="name">${name}</p>
                            <p class="last-name">${lastName}"</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;
  patientData.innerHTML += insidePatientDataElement;
};

*/

const pagesPaginationController = document.querySelector(
  ".pages-pagination-controller",
);

const perviouPageController =
  pagesPaginationController.querySelector(":nth-child(1)");
const nextPageController =
  pagesPaginationController.querySelector(":nth-child(2)");

// Hiding the pagination icons if the [patientList] empty.
const checkHowManyItemExist = () => {
  if (lenghtPaginationPage >= patientList.length) {
    pagesPaginationController.classList.contains("show") &&
      pagesPaginationController.classList.remove("show");
    pagesPaginationController.classList.add("hide");
  } else if (patientList.length > lenghtPaginationPage) {
    pagesPaginationController.classList.contains("hide") &&
      pagesPaginationController.classList.remove("hide");
    pagesPaginationController.classList.add("show");
  }
};

// not content found.
let notFoundContent = patientData.querySelector(":nth-child(1)");
const showAndHideNOContentFound = () => {
  if (patientList.length == 0) {
    notFoundContent.classList.add("show");
  } else {
    notFoundContent.classList.add("hide");
  }
};

onload = () => {
  showAndHideNOContentFound();
  checkHowManyItemExist();
};

perviouPageController.addEventListener("click", (event) =>
  //previousPaginationController()
  previousPart(),
);

nextPageController.addEventListener("click", (event) =>
  //nextPaginationController()
  nextPart(),
);

/*

  const previousPaginationController = () => {
  patientData.innerHTML = "";
  if (p != 0) {
    currentPage--;
    previousPagePointer = currentPagePointer;
    p -= 5;
    for (let i = currentPagePointer; i >= previousPagePointer; i--) {
      renderingPatientView(patientList[i]);
    }
  }
};
const nextPaginationController = () => {
  patientData.innerHTML = "";

  if (currentPage === totalPages) {
    totalPages++;
    previousPagePointer = currentPagePointer;
    currentPagePointer = patientList.length;
    for (let i = previousPagePointer; i < currentPagePointer; i++) {
      renderingPatientView(patientList[i]);
    }
  } else {
    previousPagePointer = currentPagePointer;
    currentPagePointer += 4;
    for (let i = previousPagePointer; i < currentPagePointer; i++) {
      renderingPatientView(patientList[i]);
    }
  }
};

const paginationReRendring = () => {
  for (let i = previousPagePointer; i < currentPagePointer; i++) {
    renderingPatientView(patientList[previousPagePointer]);
  }
  previousPagePointer = currentPagePointer;
  currentPagePointer += 5;
  if (currentPagePointer > patientList.length) {
    currentPagePointer = patientList.length;
  }
};

*/

const previousPart = () => {
  if (previousPointer > 0) {
    console.log("previous", previousPointer);
    nextPointer = previousPointer;
    previousPointer -= 4;
    giveTargetedPart(previousPointer, nextPointer);
  }
};

const nextPart = () => {
  if (nextPointer >= patientList.length) return;

  previousPointer = nextPointer;
  nextPointer = Math.min(nextPointer + 4, patientList.length);

  giveTargetedPart(previousPointer, nextPointer);
};

const giveTargetedPart = (start, end) => {
  patientData.innerHTML = "";
  for (let index = start; index < end; index++) {
    const { id, name, lastName, telephone, email, motif, date } =
      patientList[index];
    patientData.innerHTML += `<div class="row" draggable="true" data-id=${id}>
                        <section class="patient-data">
                            <p class="name">${name}</p>
                            <p class="last-name">${lastName}</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;
  }
};

// dark & light mode feature:

const darkAndLightMode = document.querySelector(".darkMode");

darkAndLightMode.addEventListener("click", (event) => {
  toggleMode(darkAndLightMode.classList.contains("isLight"));
});

const toggleMode = (isLight) => {
  const toggleImge = document.querySelector(".toggle-icon-mode");
  console.log(toggleImge);

  if (isLight) {
    toggleImge.style.transform = "translateX(0%)";
    setTimeout(() => {
      // Remove the lightMode and add dark mode for the switcher
      darkAndLightMode.classList.remove("isLight");
      darkAndLightMode.classList.add("isDark");
      toggleImge.src = "/images/dark.png";
      // Remove the lightMode and add dark mode for the body
      document.body.classList.remove("isLight");
      document.body.classList.add("isDark");
    }, 1000);
  } else {
    toggleImge.style.transform = "translateX(100%)";
    setTimeout(() => {
      darkAndLightMode.classList.remove("isDark");
      darkAndLightMode.classList.add("isLight");

      toggleImge.src = "/images/light.png";
      document.body.classList.remove("isDark");
      document.body.classList.add("isLight");
    }, 1000);
  }
};
let filterList = ["name"];
/// Search and Filter feature.
const filterBars = document.querySelector(".filter-bars");
filterBars.addEventListener("click", (event) => {
  const selected = event.target;
  if (selected.classList.contains("name")) return;
  const isHoldSelectedClass = selected.classList.contains("selected");
  if (isHoldSelectedClass) {
    selected.classList.remove("selected");
    const searchingField = selected.classList[1];
    filterList = filterList.filter((element) => element != searchingField);
  } else {
    selected.classList.add("selected");
    const searchingField = selected.classList[1];
    filterList.push(searchingField);
  }
  console.log(filterList);
});

// Searching feature:
const search = document.getElementById("search");

search.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase();
  filtringPatient = [...patientList];
  if (!searchValue) {
    reRenderPatientData();
    return;
  }
  filtringPatient = patientList.filter((patient) =>
    filterList.some((field) =>
      patient[field]?.toLowerCase().includes(searchValue),
    ),
  );

  reRenderPatientData(true); // re-render UI
});
