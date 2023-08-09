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

    it("will give filled slots with parked park", function () {
      const slots = Slot.getFilledSlot();

      expect(
        slots.find((slot) => slot.vehicle_id === this.car.id)
      ).toBeDefined();
    });

    it("will return car parked on a slot", function () {
      const slot = Slot.find("id", this.parked_car.slot_id);
      const carAtSlot = slot.car();

      const registration_no = carAtSlot.registration_no;

      expect(registration_no).toBe(this.car.registration_no);
    });
  });
});
