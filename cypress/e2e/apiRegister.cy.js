describe("API of account creation", () => {
  const apiUrl = "https://practice.expandtesting.com/notes/api/users/register";
  it("should successfully create an account", () => {
    const uniqueEmail = `testValid+${Date.now()}+@gmail.com`;
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        name: "Test Valid 1",
        email: uniqueEmail,
        password: "PassWord123456789",
        confirm_password: "PassWord123456789",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "message",
        "User account created successfully"
      );
    });
  });

  it("should return an error for an already used email adress", () => {
    const existingEmail = "greg6fr@gmail.com";
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        email: existingEmail,
        name: "gregoire",
        password: "123456789",
        confirm_password: "123456789",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409),
        expect(response.body).to.have.property(
          "message",
          "An account already exists with the same email address"
        );
      expect(response.body).to.have.property("success", false);
    });
  });
});
