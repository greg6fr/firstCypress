describe("Using spy and stub to manage request and response", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.intercept(
      "GET",
      "https://practice.expandtesting.com/notes/api/notes"
    ).as("allNotesSpy");

    cy.intercept("GET", "https://practice.expandtesting.com/notes/api/notes", {
      data: [],
    }).as("allNotesStub");

    cy.fixture("user").then((user) => {
      cy.login(user.userValid.email, user.userValid.password);
    });
  });

  it("Api Get Notes with Spy after login", () => {
    cy.wait("@allNotesSpy").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.body).to.have.property("data");
      expect(intercept.response.body.data).to.be.an("array");
    });
  });

  it.only("Api Get Notes with Stub after login", () => {
    cy.wait("@allNotesStub").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.body).to.have.property("data");
      expect(intercept.response.body.data).to.be.an("array");
      expect(intercept.response.body.data).to.have.length(0);
    });
  });
});
