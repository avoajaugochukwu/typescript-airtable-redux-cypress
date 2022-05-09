/// <reference types="cypress" />

define("MiniExtensions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display button", () => {
    cy.get("[data-cy=login-button]").should("contain", "login")
  });

  it("Should display input field", () => {
    cy.get("[data-cy=search-input]").should("be.visible")
  });

  it("should show 'loading' when login button is clicked", () => {
    cy.get("[data-cy=search-input]").type('sid').should('have.value', 'sid')
    cy.get("[data-cy=login-button]").click()
    cy.contains("Loading").should("be.visible")
  });

  // In a real life scenerio, I would mock the API req-res cycle.
  // But to save on time I am going to use expected response for comparison
  it("Should display accurate results when I search for 'sid'", () => {
    cy.get("[data-cy=search-input]").type('sid').should('have.value', 'sid')
    cy.get("[data-cy=login-button]").click()
    cy.contains("CS 101").should("be.visible")
    cy.contains("CS 103").should("be.visible")
    cy.contains("Jenny, Joe, Khalid, Marry, Mike, Peter, Sid,").should("be.visible")
    cy.contains("Jenny, Joe, Sid,").should("be.visible")
  });
});
