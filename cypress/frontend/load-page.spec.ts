describe('Show entry page', () => {
    it('Should show heading', () => {
        cy.navigateTo('');
        cy.get('h1').should('contain', 'Welcome to test-app!');
    });
});
