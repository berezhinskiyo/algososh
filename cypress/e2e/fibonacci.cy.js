

describe('Фибоначчи', () => {
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {

        cy.visit(`${Cypress.env('base_url')}${Cypress.env('fibonacci')}`);
        cy.get('.input_input__bAnmr')
            .type('{backspace}');

        cy.get('.button_button__-o8Pu').should('be.disabled');

    })

    it('Проверьте, что числа генерируются корректно', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('fibonacci')}`);
        cy.clock();
        cy.get('.input_input__bAnmr')
            .type('4');
        cy.get('.button_button__-o8Pu').click();
        cy.tick(500);
        cy.get('.text_type_circle').eq(0).contains(1);
        cy.get('.circle_tail30__VCoJb').eq(0).contains(0);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);

        cy.get('.text_type_circle').eq(1).contains(1);
        cy.get('.circle_tail30__VCoJb').eq(1).contains(1);
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);

        cy.get('.text_type_circle').eq(2).contains(2);
        cy.get('.circle_tail30__VCoJb').eq(2).contains(2);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);

        cy.get('.text_type_circle').eq(3).contains(3);
        cy.get('.circle_tail30__VCoJb').eq(3).contains(3);
        cy.get('.circle_circle__xMxdD').eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);


        cy.clock().then((clock) => {
            clock.restore()
        })
    });
})