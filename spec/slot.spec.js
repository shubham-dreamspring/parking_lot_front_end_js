import Car from "../model/car.js";
import ParkingLot from "../model/parkingLot.js";
import Slot from "../model/slot.js";

describe("Slots", () => {
  
  beforeEach(() => {
    Slot.reset();
    Car.reset();
  });

  afterEach(() => {
    Slot.reset();
    Car.reset();
  });

  it("will get empty slot", () => {
    let slot = Slot.getEmptySlot();

    expect(slot.id).toBeDefined();
    expect(slot.timestamp).toBeNull();
    expect(slot.vehicle_id).toBeNull();
  });

  it("will update a slot", () => {
    let slot = Slot.getEmptySlot();

    slot.timestamp = Date.now();
    slot.vehicle_id = 1;
    slot.update();

    expect(Slot.getFilledSlot().length).toBe(1);
  });

  describe("when car is parked", () => {
    beforeEach(() => {
      ParkingLot.park(new Car("WW12345678"));
    });
    afterEach(() => {
      ParkingLot.initialise();
    });
    it("will get filled slots", () => {
      let slots = Slot.getFilledSlot();
      expect(slots.length).toBe(1);
    });
    it("will return car of a slot", () => {
      let slot = Slot.find("id", 1);

      let carAtSlot = slot.car();

      expect(carAtSlot.registration_no).toBe("WW12345678");
    });
  });
});
