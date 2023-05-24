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

    describe('Load User Details Button', () => {
        it('should display a user profile if data is successfully returned from the API', () => {
            // Arrange
            const selector = 'button';

            // intercept the API call
            cy.intercept('GET', 'https://randomuser.me/api/', {fixture: 'user.json'});

            // Act
            cy.get(selector).click();

            // Assert
            cy.get('.card').should('exist');
            cy.get('.card-header').should('contain', 'User Profile');
            // assert card body data from API
            cy.get('.card-body').should('contain', 'Mr John Doe');
        });
    });
});