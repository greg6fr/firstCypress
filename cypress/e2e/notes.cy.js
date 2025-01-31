describe("Using Notes", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.fixture("user").then((user) => {
      // Utiliser une commande personnalisée pour se connecter
      cy.login(user.userValid.email, user.userValid.password);

      // Vérifier que la page d'accueil s'affiche correctement
      cy.get('[data-testid="home"]').should("contain", "MyNotes");
      cy.get('[data-testid="logout"]').should("be.visible");
    });

    // Vérifier si la liste des notes contient des éléments, puis les supprimer
    cy.get('[data-testid="notes-list"]').then(($body) => {
      if ($body.find('[data-testid="note-delete"]').length > 0) {
        // Parcourir chaque note et supprimer
        cy.get('[data-testid="note-delete"]').each(($el) => {
          cy.wrap($el).click(); // Cliquer sur "Supprimer"
          cy.get('[data-testid="note-delete-confirm"]').click(); // Confirmer la suppression
        });
      }
      cy.get('[data-testid="add-new-note"]').as("clickAddNote").click();
      cy.get('[data-testid="note-category"]').as("noteCategory");
      cy.get('[data-testid="note-title"]').as("noteTitle");
      // cy.get('[data-testid="note-title"]').as("noteTitle");
    });
  });

  it("Adding note with completed", () => {
    // cy.get("@clickAddNote").click();
    cy.get("@noteCategory").select("Home");
    cy.get('[data-testid="note-completed"]').check();
    cy.get("@noteTitle")
      .should("be.visible")
      .type("Mon titre de test pour home");
    cy.get('[data-testid="note-description"]').type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    );
    cy.get('[data-testid="note-submit"]').should("be.visible").click();
    cy.get('[data-testid="category-all"]').click();
    cy.contains("Mon titre de test pour home").should("exist");
    cy.get('[data-testid="category-home"]').should("be.enabled").click();
    cy.contains("Mon titre de test pour home").should("exist");
    cy.contains(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    ).should("exist");
    cy.get('[data-testid="toggle-note-switch"]').should(
      "have.css",
      "background-color",
      "rgb(0, 0, 255)"
    );
  });

  it.only("Adding note without completed checkbox", () => {
    // Cliquer sur le bouton pour ajouter une nouvelle note

    // Sélectionner la catégorie "Home"
    cy.get("@noteCategory").should("be.enabled").select("Home");

    // Ne pas cocher la case "completed"
    //cy.get('[data-testid="note-completed"]').should('not.be.enabled');
    // Ajouter le titre de la note
    cy.get("@noteTitle")
      .should("be.visible")
      .type("Mon titre de test pour home sans completed");

    // Ajouter la description de la note
    cy.get('[data-testid="note-description"]').type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    );

    // Cliquer sur le bouton de soumission
    cy.get('[data-testid="note-submit"]').click();

    // Vérifier que la note apparaît dans la catégorie "All"
    cy.get('[data-testid="category-all"]').click();
    cy.contains("Mon titre de test pour home sans completed").should(
      "exist"
    );

    // Vérifier que la note apparaît dans la catégorie "Home"
    cy.get('[data-testid="category-home"]').should("be.enabled").click();
    cy.contains("Mon titre de test pour home sans completed").should(
      "exist"
    );

    // Vérifier que la description de la note est correcte
    cy.contains(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    ).should("exist");

    // Vérifier que l'élément toggle a la couleur attendue
    cy.get('[data-testid="toggle-note-switch"]').should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)" // Couleur transparente en RGBA
    );
  });
});
