import Slot from "./slot.js";
import Car from "./car.js";

import { CarNotFound, SlotNotFound } from "../utils/errors/errors.js";

class ParkingLot {
  static initialise() {
    Car.intialise();
    Slot.intialise();
  }
  static reset() {
    Car.reset();
    Slot.reset();
  }
  static park(car) {
    car.create();
    let slot = Slot.getEmptySlot();
    slot.vehicle_id = car.id;
    slot.timestamp = Date.now();
    slot.update();

    return {
      registration_no: car.registration_no,
      park_timestamp: slot.timestamp,
      slot_id: slot.id,
    };
  }

  static unpark(car) {
    if (!car.alreadyExist()) throw new CarNotFound("Car is not parked");
    Slot.vacantSlot("vehicle_id", car.id);
    Car.delete("id", car.id);
  }

  static parkedCars(sortProperty = null, limit = null) {
    let slots = Slot.getFilledSlot(sortProperty, limit);
    let result = slots.map((slot) => ({
      slot_id: slot.id,
      registration_no: slot.car().registration_no,
    }));
    return result;
  }

  static findParkedCar(registration_no) {
    let car = Car.find("registration_no", registration_no);
    if (!car) throw new CarNotFound("Car is not found");
    let slot = Slot.find("vehicle_id", car.id);
    if (!slot) throw new SlotNotFound("Car is not parked");

    return {
      park_timestamp: slot.timestamp,
      registration_no: car.registration_no,
      slot_id: slot.id,
    };
  }
}

export default ParkingLot;
