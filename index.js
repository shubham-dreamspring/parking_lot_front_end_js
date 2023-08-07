import ParkingLotController from "./controller/parkingLotController.js";
import ParkingLot from "./model/parkingLot.js";

const dialog = document.querySelector("dialog");
const parkingLotController = new ParkingLotController();

reRenderCarList();

function parkCar(registration_no) {
  const res = parkingLotController.parkCar(registration_no);
  if (!res) {
    return;
  }
  renderSuccessMessage("park", res);
}

function unparkCar(registration_no) {
  const res = parkingLotController.unparkCar(registration_no);
  if (!res) {
    return;
  }
  renderSuccessMessage("unpark", res);
}

async function findCar(registration_no) {
  const res = parkingLotController.getCarByRegNo(registration_no);
  if (!res) {
    return;
  }
  renderSuccessMessage("find", res);
}

document.getElementById("car-form-park").addEventListener("submit", (event) => {
  formSubmit(event, "park");
});

document
  .getElementById("car-form-unpark")
  .addEventListener("submit", (event) => {
    formSubmit(event, "unpark");
  });

function formSubmit(event, action) {
  event.preventDefault();
  const registration_no = document.getElementById(
    `registration-no-${action}`
  ).value;
  if (action === "park") {
    parkCar(registration_no);
  } else {
    findCar(registration_no);
  }
  return false;
}

function reRenderCarList() {
  console.log("redendering.....");
  const carListComponent = document.getElementsByTagName("car-list-component");

  const recentCarElem = carListComponent[0];
  recentCarElem.setListData(ParkingLot.parkedCars("timestamp", 3));

  const allCarElem = carListComponent[1];
  allCarElem.setListData(ParkingLot.parkedCars());
}

function removeAlertMessages(action) {
  document.getElementById(`error-div-${action}`).classList.add("d-none");
  document.getElementById(`success-div-${action}`).classList.add("d-none");
}

function renderSuccessMessage(type, res) {
  let action = type === "find" ? "unpark" : type;
  document.getElementById(`error-div-${action}`).classList.add("d-none");
  document.getElementById(`success-div-${action}`).classList.remove("d-none");

  if (type === "find") {
    document.getElementById(
      `success-div-unpark`
    ).innerHTML = `<div class = "d-flex flex-column align-items-center">
    <p class=" fs-4 my-1">Car has been parked :-<strong class="d-inline text-success">${res.slot_id}</strong></p>
    <button id="unpark-car-btn" type="button" class="btn btn-outline-danger d-block my-2 mx-auto">Unpark</button>
    </div>`;
    document.getElementById("unpark-car-btn").addEventListener("click", () => {
      unparkCar(res.registration_no);
    });
    return;
  } else if (type === "unpark") {
    document.getElementById(
      `success-div-${action}`
    ).innerHTML = `<h4 class="d-inline text-success">Car has been unparked</h4>`;
    document.getElementById(
      "modal-div"
    ).innerHTML = `Your Car has been unparked`;
  } else {
    document.getElementById("slot-id").innerText = res.slot_id;
    document.getElementById(
      "modal-div"
    ).innerHTML = `${res.message}: ${res.slot_id}`;
  }
  dialog.showModal();

  removeAlertMessages(action);
  document.getElementById(`car-form-${action}`).reset();
  reRenderCarList();
}
