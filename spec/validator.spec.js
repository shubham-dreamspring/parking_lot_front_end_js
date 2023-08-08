import RegistrationNoValidator from "../utils/validator.js";

describe("Vadiation of registration number", () => {

  it("Check for correct registration number", () => {
    expect(new RegistrationNoValidator().isValidRegistrationNumber("UP72123456")).toBe(true);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("UP72asdfgh")).toBe(true);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("UP323asd43")).toBe(true);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("up323asd43")).toBe(true);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("ka323asd43")).toBe(true);
  });

  it("Check for incorrect registration number", () => {
    expect(new RegistrationNoValidator().isValidRegistrationNumber("72123456")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("UP72asdfgh32324")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("23323asd43")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("up3-3asd43")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("ka323*sd43")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("23|323sd43")).toBe(false);
    expect(new RegistrationNoValidator().isValidRegistrationNumber("ka323 sd43")).toBe(false);
  });
});
