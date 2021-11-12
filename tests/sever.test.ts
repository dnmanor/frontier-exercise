import { testJobApplicationPayload } from "../src/data/testdata";
import { validateJobApplication } from "../src/utilities/validators";

describe("Server Test Suite: Tests related to routes and server validations", (): void => {
  it("should not throw error if request payload is valid", (): void => {
    expect(
      validateJobApplication(testJobApplicationPayload)
    ).not.toHaveProperty("error");
  });
});
