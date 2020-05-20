
describe('Searching the API', () => {

    beforeEach(() => {
        cy.reset()
    })

    it('Displays the Search instructions', () => {
        cy.visit('http://localhost:3000');

        cy.findByText(/Please search by Username:/i).should('exist');

        cy.findByTestId('searchBox').should('exist');
        cy.findByTestId('searchBox').should('have.value', '');

        cy.findByTestId('resultsDiv').should('exist');
        cy.findByTestId('resultsDiv').should('have.value', '');

    });

    it('Types in the Search box', () => {

        cy.findByTestId('searchBox').type('B')
        cy.findByTestId('searchBox').should('have.value', 'B');

        cy.findByTestId('searchBox').type('r')
        cy.findByTestId('searchBox').should('have.value', 'Br');

    })
})