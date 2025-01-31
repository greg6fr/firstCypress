describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/notes/app");
  });

  context("Verify Home Page content", () => {
    it("Should display the correct welcome message", () => {
      cy.get(".fw-bold").should("contain", "Welcome to Notes App");
    });
  });

  context("Login button functionality", () => {
    it("Should display the login form when the login button is clicked", () => {
      //  cy.visit("https://practice.expandtesting.com/notes/app");
      cy.get('[data-testid="open-login-view"]')
        .find("a")
        .contains("Login")
        .click();
      cy.url().should("include", "/login");
      cy.get("form").should("be.visible");
    });
  });

  context("Register button functionality", () => {
    it("Should display the login form when the login button is clicked", () => {
      //  cy.visit("https://practice.expandtesting.com/notes/app");
      cy.get('[data-testid="open-login-view"]').click();
      cy.url().should("include", "/register");
      cy.get('[data-testid="login-form"]').contains("Register");
    });
  });
});
