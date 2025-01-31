// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', (email, password) => {
//   cy.get('[data-testid="login-email"]').type(email);
//   cy.get('[data-testid="login-password"]').type(password);
//   cy.get('[data-testid="login-submit"]').click();
// });

Cypress.Commands.add("login", (email, password) => {
  // Assurez-vous que vous attendez que la page soit complètement chargée avant d'interagir
  cy.get('[data-testid="login-email"]', { timeout: 10000 })
    .should("be.visible")
    .type(email);
  //cy.get('[data-testid="login-email"]').should("be.visible").type(email);
  cy.get('[data-testid="login-password"]').should("be.visible").type(password);
  cy.get('[data-testid="login-submit"]').should("be.enabled").click();
  // cy.get('[data-testid="home"]').contains("MyNotes");

  // Optionnel : Attendre que la redirection ou un élément de la page suivante apparaisse
  //  cy.url().should('not.include', '/login'); // Vérifie que l'utilisateur n'est plus sur la page de login
});
