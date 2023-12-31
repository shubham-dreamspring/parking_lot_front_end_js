import {
  CarNotFound,
  NoEmptySlot,
  SlotNotFound,
} from "../utils/errors/errors.js";
import CustomOrm from "../utils/customOrm.js";
import Car from "./car.js";

class Slot extends CustomOrm {
  static _doc = "slots";
  static _noOfSlots = 10;

  constructor(id, vehicle_id = null, timestamp = null) {
    super(Slot._doc);
    this.id = id;
    this.timestamp = timestamp;
    this.vehicle_id = vehicle_id;
  }

  isEmpty() {
    return !this.vehicle_id;
  }

  car() {
    let car = Car.find("id", this.vehicle_id);
    if (!car) throw new CarNotFound("car is not parked with this id");
    return new Car(car.registration_no, car.id);
  }

  static getEmptySlot() {
    let slots = this.findAll();
    let emptyslots = slots.filter((slot) => slot.isEmpty());

    if (!emptyslots.length) {
      throw new NoEmptySlot("No empty slot is available");
    }
    let slot = new Slot(
      emptyslots[0].id,
      emptyslots[0].timestamp,
      emptyslots[0].vehicle_id
    );
    return slot;
  }

  static getFilledSlot(sortProperty = null, limit = null) {
    let slots = this.findAll(sortProperty, limit);
    let filledSlots = slots
      .filter((slot) => slot.vehicle_id)
      .map((slot) => new Slot(slot.id, slot.vehicle_id, slot.timestamp));
    return filledSlots;
  }
  static findAll(sortProperty = null, limit = null) {
    const slots = super.findAll(sortProperty, limit);
    let result = slots.map(
      (slot) => new Slot(slot.id, slot.vehicle_id, slot.timestamp)
    );
    return result;
  }

  static find(propertyName, propertyValue) {
    const slot = super.find(propertyName, propertyValue);
    if (!slot) throw new SlotNotFound("No slot found !");
    return new Slot(slot.id, slot.vehicle_id, slot.timestamp);
  }

  static vacantSlot(propertyName, propertyValue) {
    const slot = Slot.find(propertyName, propertyValue);
    if (!slot) throw new SlotNotFound("No slot found !");
    slot.timestamp = null;
    slot.vehicle_id = null;
    slot.update();
  }

  static reset() {
    let data = [];
    for (let i = 1; i <= Slot._noOfSlots; i++) {
      data.push({
        id: i,
        timestamp: null,
        vehicle_id: null,
      });
    }
    super.reset(data);
  }
}

export default Slot;
