describe('Test', () => {
    it('Проверка файла 1', () => {
      cy.visit('./uploads/files/html/index.html')
      cy.readFile('./uploads/files/html/index.html')
      // cy.document().its('contentType').should('eq', 'text/html') 
    })
    it('Проверка файла 2', () => {
      cy.visit('./uploads/files/html/index.html')
      cy.document().its('contentType').should('eq', 'text/html') 
    })
    //  cy.get('h1').should('contain', 'todos')
  })