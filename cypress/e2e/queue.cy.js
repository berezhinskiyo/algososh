

describe('Стек', () => {
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {

        cy.visit(`${Cypress.env('base_url')}${Cypress.env('queue')}`);
        cy.get('.input_input__bAnmr').eq(0)
            .type('{backspace}');

        cy.get('.button_button__-o8Pu').eq(0).should('be.disabled');

    })

    it('Проверьте правильность добавления элемента в очередь', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('queue')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.text_type_circle').eq(0).contains(4);
        cy.get('.circle_index__3q1NY').eq(0).contains(0);
        cy.get('.circle_head__E38zo').eq(0).contains('head');
        cy.get('.circle_tail60__Q5Aq5').eq(0).contains('tail');

        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get('.input_input__bAnmr').eq(0)
            .type('5');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);


        cy.get('.text_type_circle').eq(1).contains(5);
        cy.get('.circle_index__3q1NY').eq(1).contains(1);
        cy.get('.circle_tail60__Q5Aq5').eq(1).contains('tail');
        cy.get('.circle_head__E38zo').eq(0).should('have.value', '');
        cy.get('.circle_circle__xMxdD').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get('.circle_tail60__Q5Aq5').eq(0).should('have.value', '');
        cy.get('.circle_head__E38zo').eq(0).contains('head');


        cy.clock().then((clock) => {
            clock.restore()
        })
    });

    it('Проверить правильность удаления элемента из очереди', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('queue')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.tick(1000);
        cy.get('.input_input__bAnmr').eq(0)
            .type('5');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.tick(1000);
        cy.get('.button_button__-o8Pu').eq(1).click();

        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.circle_tail60__Q5Aq5').eq(0).should('have.value', '');
        cy.get('.circle_head__E38zo').eq(0).should('have.value', '');
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get('.circle_head__E38zo').eq(1).contains('head');

        cy.clock().then((clock) => {
            clock.restore()
        })
    });

    it('Проверьте поведение кнопки «Очистить»', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('queue')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.tick(1000);
        cy.get('.input_input__bAnmr').eq(0)
            .type('5');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.tick(1000);
        cy.get('.input_input__bAnmr').eq(0)
            .type('6');
        cy.get('.button_button__-o8Pu').eq(0).click();
        cy.tick(1000);
        cy.get('.button_button__-o8Pu').eq(2).click();
        cy.tick(1000);
        for (let i; i < 7; i++) {
            cy.get('.text_type_circle').eq(i).should('have.value', '');
            cy.get('.circle_tail60__Q5Aq5').eq(i).should('have.value', '');
            cy.get('.circle_head__E38zo').eq(i).should('have.value', '');
        }


        cy.clock().then((clock) => {
            clock.restore()
        })
    });
})