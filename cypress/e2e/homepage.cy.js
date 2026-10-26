
describe("Homepage", () => {
  it("loads the starter page", () => {
    cy.visit("/");
    cy.contains("h1", "Get started").should("be.visible");
  });

  it("increments the counter when clicked", () => {
    cy.visit("/");

    // NOTE: it is preferable to label interactive elements with data attributes for easier testing rather than relying on visible text.
    // For example, you could add a data-cy attribute to the button and select it using cy.get('[data-cy="counter-button"]') instead of relying on the button text.
    cy.contains("button", "Count is 0").should("be.visible");
    cy.contains("button", "Count is 0").click();
    cy.contains("button", "Count is 1").should("be.visible");

    cy.contains("button", "Count is 1").click();
    cy.contains("button", "Count is 2").should("be.visible");
  });
});


