
describe('Searching the API', () => {
    it('Displays the Search instructions', () => {
        cy.visit('http://localhost:3000');

        cy.findByText(/Please search by Username:/i).should('exit');
    })
})