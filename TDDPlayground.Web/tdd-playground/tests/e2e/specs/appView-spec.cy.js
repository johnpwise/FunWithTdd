describe("AppView", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should contain a 'nav' element", () => {
        // Arrange
        const selector = "nav";

        // Assert
        cy.get(selector).should("exist");
    });

    it("should contain a link to the 'Dogs' page", () => {
        // Arrange
        const selector = "nav a[href='/dogs']";
        const expected = "Dogs";

        // Assert
        cy.get(selector).should("exist");
        cy.get(selector).should('contain', expected);
        cy.get(selector).click();
        cy.url().should('include', '/dogs');
    });
});