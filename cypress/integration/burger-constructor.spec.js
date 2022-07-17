context("Burger-constructor test", () => {
    it("Check response from page", () => {
        cy.visit("http://localhost:3000");
    })

    it("Open modal", () => {
        cy.get("[data-test='drag-element-bun']").first().click()
    })

    it("Check contains name in modal", () => {
        cy.get("[data-test='modal']")
            .find("[data-test='name']")
            .should("have.text", "Краторная булка N-200i")
    })

    it("Close modal", () => {
        cy.get("[data-test='close']").trigger("click")
    })

    it("Move ingredients to constructor", () => {
        cy.get("[data-test='drag-element-bun']").first().trigger("dragstart")
        cy.get('[data-test="drop-target"]').trigger("drop")
        cy.get("[data-test='drag-element-main']").first().trigger("dragstart")
        cy.get('[data-test="drop-target"]').trigger("drop")
        cy.get("[data-test='drag-element-sauce']").first().trigger("dragstart")
        cy.get('[data-test="drop-target"]').trigger("drop")
    })

    it("Open order modal after click on button", () => {
        cy.get("[name='test-order-button']").click()

        cy.get('input[name="email"]').type("grimm250894@gmail.com")
        cy.get('input[name="password"]').type("852456")
        cy.get('form button').click()

        cy.get("[name='test-order-button']").click()

        cy.get("[data-test='close']", {
            timeout: 16000
        }).trigger("click")
    })


})