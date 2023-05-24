describe('App Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should contain a "nav" element', () => {
        // Arrange
        const selector = 'nav';

        // Act & Assert
        cy.get(selector).should('exist');
    });

    it('should contain a "User" link and navigate to the correct url when clicked', () => {
        // Arrange
        const selector = 'nav a[href="/user"]';
        const expected = 'User';

        // Act & Assert
        cy.get(selector).should('exist');
        cy.get(selector).should('contain', expected);
        cy.get(selector).click();
        cy.url().should('include', '/user');
    });
});