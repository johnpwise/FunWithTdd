describe("DogsView", () => {
    beforeEach(() => {
        cy.visit("/dogs");
    });

    it("should contain a 'h1' element, with the text 'Dogs View'", () => {
        // Arrange
        const selector = "h1";
        const expected = "Dogs View";

        // Assert
        cy.get(selector).should("exist");
        cy.get(selector).should('contain', expected);
    });

    it("should contain a card with the header 'Doggie Data'", () => {
        // Arrange
        const selector = ".card";
        const expected = "Doggie Data";

        // Assert
        cy.get(selector).should("exist");
        cy.get(selector).should('contain', expected);
    });

    it("should contain a label with the text 'Image'", () => {
        // Arrange
        const selector = "label";
        const expected = "Image";

        // Assert
        cy.get(selector).should("exist");
        cy.get(selector).should('contain', expected);
    });

    it("should contain an image tag with the alt text 'Dog'", () => {
        // Arrange
        const selector = "img";
        const expected = "dog";

        // Assert
        cy.get(selector).should("exist");
        cy.get(selector).should('have.attr', 'alt', expected);
    });
});