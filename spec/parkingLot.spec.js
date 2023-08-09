import Car from "../model/car.js";
import ParkingLot from "../model/parkingLot.js";
import { RecordNotFound } from "../utils/errors/errors.js";

describe("Parking Lot", () => {
  beforeEach(() => {
    ParkingLot.reset();
  });

  afterEach(() => {
    ParkingLot.reset();
  });

  describe("#park", () => {
    it("will park car", () => {
      const car = new Car("UP12345678");

      ParkingLot.park(car);

      expect(
        ParkingLot.parkedCars().find(
          (parkedCar) => parkedCar.registration_no === car.registration_no
        )
      ).toBeDefined();
    });
  });

  describe("#unpark", () => {
    it("will throw error if car is not parked", () => {
      const car = new Car("KA23123456");

      expect(function () {
        ParkingLot.unpark(car);
      }).toThrowError(RecordNotFound);
    });

    it("will unpark car", () => {
      const car = new Car("UP12345678");
      ParkingLot.park(car);

      ParkingLot.unpark(car);

      expect(
        ParkingLot.parkedCars().find(
          (parkedCar) => parkedCar.registration_no === car.registration_no
        )
      ).toBeUndefined();
    });
  });
});
