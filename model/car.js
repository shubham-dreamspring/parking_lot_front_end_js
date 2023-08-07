import RegistrationNoValidator from "../utils/validator.js";
import CustomORM from "../utils/orm.js";
import { InvalidRegNo, CarAlreadyParked } from "../utils/errors/errors.js";

class Car extends CustomORM {
  static _doc = "vehicles";

  constructor(registration_no, id = null) {
    super(Car._doc);
    this.registration_no = registration_no;
    this.id = id;
  }

  validate() {
    if (!this.isValidRegistrationNumber()) {
      throw new InvalidRegNo("Not a Valid Registration No");
    }
    if (this.alreadyExist())
      throw new CarAlreadyParked("Car is already parked");
  }

  alreadyExist() {
    let car = Car.find("registration_no", this.registration_no);
    if (car) {
      this.id = car.id;
      return true;
    }
    return false;
  }

  isValidRegistrationNumber() {
    const validator = new RegistrationNoValidator();
    return validator.isValidRegistrationNumber(this.registration_no);
  }
  uid(length = 16) {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    );
  }

  create() {
    this.validate();
    this.id = this.uid();
    super.create();
    return this;
  }
}

export default Car;
