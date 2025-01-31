class LoginPage {
  get emailInput() {
    return cy.get('[data-testid="login-email"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="login-password"]');
  }

  get submitButton() {
    return cy.get('[data-testid="login-submit"]');
  }
  visit() {
    cy.visit("/login");
  }

  verifErrorMsgForEmail() {
    cy.get(":nth-child(1) > .invalid-feedback")
      .should("be.visible")
      .should("contain", "Email address is invalid");
  }

  verifErrorMsgForPassword() {
    cy.get(":nth-child(2) > .invalid-feedback")
      .should("be.visible")
      .should("contain", "Password is required");
  }

  verifAlertMessage() {
    cy.get('[data-testid="alert-message"]').should("be.visible");
  }

  verifHomePage() {
    cy.get('[data-testid="home"]').contains("MyNotes");
  }

  login(email, password) {
    this.emailInput.type(email);
    if (password) {
      this.passwordInput.type(password);
    }
    this.submitButton.click();
  }
}

export default new LoginPage();
