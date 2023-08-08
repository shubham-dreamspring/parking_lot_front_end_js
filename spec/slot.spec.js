import Car from "../model/car.js";
import ParkingLot from "../model/parkingLot.js";
import Slot from "../model/slot.js";

describe("Slots", () => {
  beforeEach(() => {
    ParkingLot.reset();
  });

  afterEach(() => {
    ParkingLot.reset();
  });

  it("will give empty slot", () => {
    let slot = Slot.getEmptySlot();

    expect(slot.isEmpty()).toBeTruthy();
  });

  describe("when car is parked", () => {
    beforeEach(function () {
      this.car = new Car("WW12345678");
      this.parked_car = ParkingLot.park(this.car);
    });

    afterEach(function () {
      ParkingLot.reset();
    });

    it("will give filled slots", function () {
      let slots = Slot.getFilledSlot();

      expect(slots[0].vehicle_id).toBe(this.car.id);
    });

    it("will return car parked on a slot", function () {
      let slot = Slot.find("id", this.parked_car.slot_id);
      let carAtSlot = slot.car();

      const registration_no = carAtSlot.registration_no;

      expect(registration_no).toBe(this.car.registration_no);
    });
  });
});
