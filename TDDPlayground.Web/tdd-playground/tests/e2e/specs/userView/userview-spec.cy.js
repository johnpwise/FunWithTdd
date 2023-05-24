describe('User View', () => {
    beforeEach(() => {
        cy.visit('/user');
    });

    it('should contain a h3 element with the text "User"', () => {
        // Arrange
        const selector = 'h3';
        const expected = 'User Page';

        // Act & Assert
        cy.get(selector).should('exist');
        cy.get(selector).should('contain', expected);
    });

    it('should contain a Primary styled button with the text "Load User Details"', () => {
        // Arrange
        const selector = 'button';
        const expected = 'Load User Details';

        // Act & Assert
        cy.get(selector).should('exist');
        cy.get(selector).should('contain', expected);
    });
});