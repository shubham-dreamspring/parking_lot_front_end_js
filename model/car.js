import RegistrationNoValidator from "../utils/registrationNoValidator.js";
import CustomORM from "../utils/customOrm.js";
import { InvalidRegNo, CarAlreadyParked } from "../utils/errors/errors.js";

class Car extends CustomORM {
  static _doc = "vehicles";

  constructor(registration_no, id = null) {
    super(Car._doc);
    this.registration_no = registration_no;
    this.id = id;
  }

  _validate() {
    if (!this._isValidRegistrationNumber()) {
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

  _isValidRegistrationNumber() {
    const validator = new RegistrationNoValidator();
    return validator.isValidRegistrationNumber(this.registration_no);
  }
  
  _uid(length = 16) {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    );
  }

  create() {
    this._validate();
    this.id = this._uid();
    super.create();
    return this;
  }
}

export default Car;
