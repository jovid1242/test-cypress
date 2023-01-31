describe("Test", () => {
  it("Проверяем файл index.html (в каталоге html)", () => {
    cy.visit("./uploads/files/html/index.html");
    cy.readFile("./uploads/files/html/index.html");
    cy.log('Проверяем файл - ok')
  });
  it("Проверяем тип файла index.html", () => {
    cy.visit("./uploads/files/html/index.html");
    cy.document().its("contentType").should("eq", "text/html");
    cy.log('Проверяем тип файла - ok')
  });
  it("Проверяем текст h1", () => {
    cy.visit("./uploads/files/html/index.html");
    cy.get("h1").should("have.text", "Hello World");
    cy.log('Проверяем текст - ok')
  });
});
