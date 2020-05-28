
describe('Searching the API', () => {

    before(() => cy.visit('http://localhost:3000'))

    beforeEach(() => {
        cy.reload()
    })

    it('Searches the API', () => {

        cy.findByText(/Please search by Username:/i).should('exist')

        cy.findByTestId('searchBox').should('have.value', '')
        cy.findByTestId('resultsDiv').should('have.value', '')

        cy.findByTestId('searchBox').type('A')
        cy.findByTestId('resultsDiv').should('have.value', '')

        cy.findByTestId('searchBox').type('nt')
        cy.findByTestId('searchBox').should('have.value', 'Ant')

        cy.findByTestId('resultsDiv').should('contain', 'Antonette')
        cy.findByTestId('resultsDiv').should('contain', 'Samantha')

    })
})