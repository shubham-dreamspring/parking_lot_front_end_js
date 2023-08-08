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
      let car = new Car("UP12345678");
      ParkingLot.park(car);

      expect(ParkingLot.parkedCars()[0].registration_no).toBe(
        car.registration_no
      );
    });
  });

  describe("#unpark", () => {
    it("will throw error if car is not parked", () => {
      let car = new Car("KA23123456");

      expect(function () {
        ParkingLot.unpark(car);
      }).toThrowError(RecordNotFound);
    });

    it("will unpark car", () => {
      let car = new Car("UP12345678");
      ParkingLot.park(car);

      ParkingLot.unpark(car);

      expect(Car.find("registration_no", car.registration_no)).toBeUndefined();
    });
  });
});
