describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/notes/app");
  });

  it("Should verify if login working", () => {
    cy.get(".btn-primary").contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("form.py-3").should("be.visible");
    cy.get('[data-testid="login-email"]').type("greg6fr@gmail.com");
    cy.get('[data-testid="login-password"]').type("123456789");
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="home"]').contains("MyNotes");
  });

  it("Should verify incorrects credentials", () => {
    cy.get(".btn-primary").contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("form.py-3").should("be.visible");
    cy.fixture("user").then((user) => {
      cy.login(user.invalidUser.email,user.invalidUser.password);

      cy.get('[data-testid="alert-message"]').should("be.visible");
    });
  });

  it("Should verify invalid email", () => {
    cy.get(".btn-primary").contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("form.py-3").should("be.visible");
    cy.get('[data-testid="login-email"]').type("greg7fr");
    cy.get('[data-testid="login-password"]').clear();
    cy.get('[data-testid="login-submit"]').click();
    cy.get(":nth-child(1) > .invalid-feedback").should("be.visible");
    cy.get(":nth-child(2) > .invalid-feedback").should("be.visible");
  });
});
