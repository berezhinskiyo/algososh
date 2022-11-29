

describe('Тестирование алгоритма разворота строки', () => {
    it('Корректно разворачивает строку с чётным количеством символов', () => {

        /*cy.visit(Cypress.env('recursion'));
        cy.get('.input_input__bAnmr')
            .type('1234');
        cy.get('.button_button__-o8Pu')
            .click();
        //cy.clock();
        //cy.tick(6000);
        cy.wait(6000);
        cy.get('.text_type_circle')
            .should('have.length', 4);

        cy.get('.text_type_circle').eq(0).contains(4);
        cy.get('.text_type_circle').eq(1).contains(3);
        cy.get('.text_type_circle').eq(2).contains(2);
        cy.get('.text_type_circle').eq(3).contains(1);

        /*cy.get('.text_type_circle').each(($el, index, $list) => {
            cy.log($el);
            cy.wrap($el).contains(index - 1)
        });*/

    })
})