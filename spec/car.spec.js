import Car from "../model/car.js";
import { InvalidInput, AlreadyExist } from "../utils/errors/errors.js";

describe("Cars", () => {
  beforeEach(() => {
    Car.reset();
  });

  afterEach(() => {
    Car.reset();
  });

  describe("on create", () => {
    it("will throw error if it is invalid registration no", () => {
      let car = new Car("UPsdaksd93459cd48");

      expect(function () {
        car.create();
      }).toThrowError(InvalidInput);
    });

    it("will save", () => {
      let registration_no = "UP12345678";

      new Car(registration_no).create();

      expect(Car.find("registration_no", registration_no)).toBeDefined();
    });

    it("will throw error if car is already existed", () => {
      new Car("WW91827364").create();

      expect(function () {
        new Car("WW91827364").create();
      }).toThrowError(AlreadyExist);
    });
  });
});
