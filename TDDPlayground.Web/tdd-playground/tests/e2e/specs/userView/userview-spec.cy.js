describe('User View', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://randomuser.me/api/', { fixture: 'user.json' }).as('getUserData');

        // Set the base URL for resolving relative image paths
        // cy.intercept({ url: '**/images/**', middleware: true }, (req) => {
        //     req.url = req.url.replace('/images/', '/fixtures/images/');
        // });

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
        const expectedClass = 'btn-primary';

        // Act & Assert
        cy.get(selector).should('exist');
        cy.get(selector).should('contain', expected);
        cy.get(selector).should('have.class', expectedClass);
    });

    it('should contain a styled table', () => {
        // Arrange
        const tableSelector = 'table';
        const expected = 'table';

        // Act & Assert
        cy.get(tableSelector).should('exist');
        cy.get(tableSelector).should('have.class', expected);
    });

    describe('Load User Details Button', () => {
        it('should display a user profile if data is successfully returned from the API', () => {
            // Arrange
            const selector = 'button';

            // Act
            cy.get(selector).click();

            // Assert
            cy.get('.card').should('exist');
            cy.get('.card-header').should('contain', 'User Profile');

            cy.get('.card-body').should('contain', 'Full Name:').and('contain', 'Mr John Doe');
            cy.get('.card-body').should('contain', 'Date of Birth:').and('contain', '28/12/1970');
            cy.get('.card-body').should('contain', 'Email:').and('contain', 'johndoe@test.com');

            cy.get('.card-body').should('contain', 'Login Details');
            cy.get('.card-body').should('contain', 'Date of Birth:').and('contain', 'yellowpeacock117');
            cy.get('.card-body').should('contain', 'Password:').and('contain', 'addison');
            cy.get('.card-body').should('contain', 'UUID:').and('contain', '7a0eed16-9430-4d68-901f-c0d4c1c3bf00');

            cy.wait('@getUserData').then(() => {
                cy.fixture('user.json').then((userData) => {
                    const imagePath = userData.results[0].picture.large;

                    cy.get('img').should('have.attr', 'src', imagePath);
                });
            });
        });

        it('should display an error toast if the API returns an error', () => {
            // Arrange
            const selector = 'button';
            cy.intercept('GET', 'https://randomuser.me/api/', { statusCode: 500 });

            // Act
            cy.get(selector).click();

            // Assert: check that an error toast is displayed
            cy.get('.toast').should('exist');
        });
    });
});