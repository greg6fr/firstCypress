describe("Using token to get all Notes for a user", () => {
  let authToken;

  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/users/login",
      body: {
        email: "greg6fr@gmail.com",
        password: "123456789",
      },
    }).then((response) => {
      // Vérifier que la requête a réussi
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");

      // Récupérer le token
      authToken = response.body.data.token;
      expect(authToken).to.not.be.empty;
    });
  });

  it("should get all notes by using token of user connected", () => {
    cy.request({
      method: "GET",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "x-auth-token": authToken,
        //  Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
    });
  });
});
