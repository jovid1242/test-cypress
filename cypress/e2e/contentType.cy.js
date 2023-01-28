describe('Проверка тип файла', () => {

    it('type file', () => {
      cy.visit('./uploads/files/docs/index.html')
      cy.document().its('contentType').should('eq', 'text/html') 
    })
  })