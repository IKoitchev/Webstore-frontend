describe("Shopping cart", () => {
  it("Open Shopping cart without logging in", () => {
    cy.visit("/cart");
    cy.url().should("include", "/login");
  });

  // it("Open game details", () => {
  //   cy.visit("/login");

  //   cy.fixture("profile").then((userFixture) => {
  //     cy.get("[id^=username]").type(userFixture.name);
  //   });
  //   cy.fixture("profile").then((userFixture) => {
  //     cy.get("[id^=password]").type(userFixture.password);
  //   });

  //   cy.get("[id^=loginbtn]").click({ force: true });

  //   cy.wait(5000);
  //   cy.get("[id=title-link]").first().click({ force: true });

  //   cy.url().should("include", "/details");
  // });
  it("Add to cart", () => {
    cy.visit("/login");

    cy.fixture("profile").then((userFixture) => {
      cy.get("[id^=username]").type(userFixture.name);
    });
    cy.fixture("profile").then((userFixture) => {
      cy.get("[id^=password]").type(userFixture.password);
    });

    cy.get("[id^=loginbtn]").click();

    cy.get("[id^=accordion-game]").first().click({ force: true });
    cy.get("[id^=add-to-cart-button]").first().click({ force: true });

    cy.get("[id=profile-dropdown]").click();

    cy.get("[id=cart-dropdown]").click();

    cy.get("[id=title-link-cart-view]").contains("");
  });
  it("Open Shopping cart after logging in", () => {
    cy.visit("/login");

    cy.fixture("profile").then((userFixture) => {
      cy.get("[id^=username]").type(userFixture.name);
    });
    cy.fixture("profile").then((userFixture) => {
      cy.get("[id^=password]").type(userFixture.password);
    });

    cy.get("[id^=loginbtn]").click();

    cy.get("[id=profile-dropdown]").click();

    cy.get("[id=cart-dropdown]").click();

    cy.url().should("include", "/cart");
  });
});
