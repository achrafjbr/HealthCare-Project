/* General variables*/
const lenghtPaginationPage = 5;
let currentPage = 1; // pagination start
let patientList = []; // list that contains all patients.

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
  onSubmit(event, validate)
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
    successMessage.style.src = "imagesdelete.png";
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
    checkHowManyItemExist();
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

// I'll develop it later.
const reRenderPatientData = () => {
  checkHowManyItemExist();
  patientData.innerHTML = "";
  patientList.forEach(
    ({ id, name, telephone, lastName, email, motif, date }, indx) => {
      const insidePatientDataElement = `<div class="row" draggable="true" data-id=${id}>
                        <section class="patient-data">
                            <p class="name">${name}</p>
                            <p class="last-name">${lastName}">Hasnaoui</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;

      if (indx > 4) {
        return;
      } else {
        patientData.innerHTML += insidePatientDataElement;
      }
    }
  );
};
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
                            <p class="last-name">${lastName}">Hasnaoui</p>
                            <p class="tel">${telephone}</p>
                            <p class="email">${email}</p>
                            <p class="motif">${motif}</p>
                            <p class="date">${date}</p>
                        </section>
                    </div>`;
  patientData.innerHTML += insidePatientDataElement;
};
const pagesPaginationController = document.querySelector(
  ".pages-pagination-controller"
);
const perviouPageController =
  pagesPaginationController.querySelector(":nth-child(1)");
const nextPageController =
  pagesPaginationController.querySelector(":nth-child(2)");

// Hiding the pagination icons if the [patientList] empty.
const checkHowManyItemExist = () => {
  if (patientList.length <= lenghtPaginationPage) {
    pagesPaginationController.classList.contains("show") &&
      pagesPaginationController.classList.remove("show");
    pagesPaginationController.classList.add("hide");
  } else {
    pagesPaginationController.classList.contains("hide") &&
      pagesPaginationController.classList.remove("hide");
    pagesPaginationController.classList.add("show");
  }
};
onload = () => checkHowManyItemExist();

perviouPageController.addEventListener("click", (event) =>
  previousPaginationController()
);
nextPageController.addEventListener("click", (event) =>
  nextPaginationController()
);

let currentPagePointer = 5;
let previousPagePointer = 0;

// [ item1, item2, item3, item4, item5, item6, item7, ]

const previousPaginationController = () => {
  if (currentPagePointer > lenghtPaginationPage) {
    currentPagePointer = currentPagePointer - previousPagePointer + 2;
    previousPagePointer = previousPagePointer / 2;
    for (let i = previousPagePointer; i < currentPagePointer; i++) {
      renderingPatientView(patientList[previousPagePointer]);
    }
  }
  /*
    -Followed rule:
       currentPagePointer=7 | previousPagePointer = 5
       7-5= 2 | 7-5 + 2 = 4
       previousPagePointer/2=0
    */
};
const nextPaginationController = () => {
  if (patientList.length > lenghtPaginationPage) {
    for (let i = previousPagePointer; i < currentPagePointer; i++) {
      renderingPatientView(patientList[previousPagePointer]);
    }
    previousPagePointer = currentPagePointer;
    currentPagePointer += 5;
    if (currentPagePointer > patientList.length) {
      currentPagePointer = patientList.length;
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
