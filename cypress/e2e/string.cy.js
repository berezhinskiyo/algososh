

describe('Строка', () => {
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {

        cy.visit(`${Cypress.env('base_url')}${Cypress.env('recursion')}`);
        cy.get('.input_input__bAnmr')
            .type('{backspace}');

        cy.get('.button_button__-o8Pu').should('be.disabled');

    })

    it('Проверьте, что строка разворачивается корректно', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('recursion')}`);
        cy.clock();
        cy.get('.input_input__bAnmr')
            .type('123');
        cy.get('.button_button__-o8Pu').click();
        cy.get('.text_type_circle').eq(0).contains(1);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('.text_type_circle').eq(1).contains(2);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('.text_type_circle').eq(2).contains(3);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(1000);
        cy.get('.text_type_circle').eq(0).contains(1);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('.text_type_circle').eq(1).contains(2);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('.text_type_circle').eq(2).contains(3);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.text_type_circle').eq(0).contains(3);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get('.text_type_circle').eq(1).contains(2);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('.text_type_circle').eq(2).contains(1);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.get('.text_type_circle').eq(0).contains(3);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get('.text_type_circle').eq(1).contains(2);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('.text_type_circle').eq(2).contains(1);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.get('.text_type_circle').eq(0).contains(3);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get('.text_type_circle').eq(1).contains(2);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get('.text_type_circle').eq(2).contains(1);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.clock().then((clock) => {
            clock.restore()
        })
    });
})