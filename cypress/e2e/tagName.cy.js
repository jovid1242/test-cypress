describe("Проверка тег h1", () => {
  // it("Проверка текст тег а", () => {
  //   cy.request("https://api.ofolio.ru/api/users").as("response");
  //   cy.get("@response").then((response) => {
  //     cy.visit(`./files/docs/${response.body.users[0].name}.html`);
  //     cy.get("a").should("have.text", "Google");
  //   });
  // });

  it("Проверяем текст h1", () => {
    cy.visit("./uploads/files/html/index.html");
    cy.get("h1").should("have.text", "Hello World");
  });
});
