import RegistrationNoValidator from "../utils/registrationNoValidator.js";

describe("Vadid registration_no ", () => {
  it("should start with two alphabets", () => {
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("UP72123456")
    ).toBe(true);
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("UP72asdfgh")
    ).toBe(true);
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("Up323asd43")
    ).toBe(true);
  });

  it("should have length of 10", () => {
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("UP12345678")
    ).toBe(true);
  });

  it("should not permit special characters", () => {
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("up3-3asd43")
    ).toBe(false);
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("ka323*sd43")
    ).toBe(false);
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("23|323sd43")
    ).toBe(false);
  });

  it("should not permit spaces", () => {
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("ka323 sd43")
    ).toBe(false);
  });

  it("should not have length more or less than 10", () => {
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("UP72asdfgh32324")
    ).toBe(false);
    expect(
      new RegistrationNoValidator().isValidRegistrationNumber("72123456")
    ).toBe(false);
  });
});
