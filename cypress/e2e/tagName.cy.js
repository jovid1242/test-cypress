describe("Проверка тег а", () => {
  // it("Проверка текст тег а", () => {
  //   cy.request("https://api.ofolio.ru/api/users").as("response");
  //   cy.get("@response").then((response) => {
  //     cy.visit(`./files/docs/${response.body.users[0].name}.html`);
  //     cy.get("a").should("have.text", "Google");
  //   });
  // });

  it("Проверка url тег а", () => {
    cy.visit("./uploads/files/html/index.html");
    cy.get("a").should("have.text", "Google");
  });
});
