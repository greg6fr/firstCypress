import loginPage from "./login";

describe("Login with POM", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("Login with correct email and incorrect password", () => {
    cy.fixture("user").then((user) => {
      loginPage.login(user.userValid.email, user.userValid.password);

      loginPage.verifHomePage();
    });
  });

  it("Login with incorrect email and/or incorrect password", () => {
    loginPage.login("tes@gmail.com", "123456789");
    loginPage.verifAlertMessage();
  });

  it("Login with correct email and empty password", () => {
    loginPage.login("greg6fr@gmail.com", "");
    loginPage.verifErrorMsgForPassword();
  });
});
