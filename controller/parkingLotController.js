import Car from "../model/car.js";
import ParkingLot from "../model/parkingLot.js";
import errorHandler from "../utils/errors/errorHandler.js";
class ParkingLotController {
  getCarByRegNo(registration_no) {
    let data = null;
    try {
      data = ParkingLot.findParkedCar(registration_no);
    } catch (e) {
      errorHandler(e, "unpark");
    }
    return data;
  }

  parkCar(registration_no) {
    let data = null;
    try {
      const car = new Car(registration_no);
      data = ParkingLot.park(car);
      return { message: "Car has been parked", ...data };
    } catch (e) {
      errorHandler(e, "park");
    }
    return data;
  }

  unparkCar(registration_no) {
    let data = null;
    try {
      const car = new Car(registration_no);
      ParkingLot.unpark(car);
      return { message: "Car has been unparked" };
    } catch (e) {
      errorHandler(e, "unpark");
    }
    return data;
  }

  initialize(registration_no) {
    try {
      ParkingLot.initialise();
      res.send({ message: "Parking lot has been initialised" });
    } catch (e) {
      errorHandler(e);
    }
  }
}

export default ParkingLotController;
