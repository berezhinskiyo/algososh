

describe('Список', () => {
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже', () => {

        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        cy.get('.input_input__bAnmr').eq(0)
            .type('{backspace}');

        cy.get('.button_button__-o8Pu').eq(0).should('be.disabled');
        cy.get('.button_button__-o8Pu').eq(1).should('be.disabled');
        cy.get('.button_button__-o8Pu').eq(4).should('be.disabled');
        cy.get('.button_button__-o8Pu').eq(5).should('be.disabled');

    })

    it('Проверьте корректность отрисовки дефолтного списка', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        cy.get('.text_type_circle').should('have.length.greaterThan', 2).and('have.length.lessThan', 7);

        cy.get('.text_type_circle').each(($text) => {
            cy.wrap($text)
                .invoke('text')
                .then((s) => cy.wrap(Number.parseInt(s)).should('be.gte', 0).and('be.lte', 6));
        })

    });

    it('Проверьте корректность добавления элемента в head', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.button_button__-o8Pu').eq(0).click();

        cy.get('.circle_small__uHqmw').eq(0).contains(4);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.circle_head__E38zo').eq(0).eq(0).contains('head');
        cy.get('.text_type_circle').eq(0).contains(4);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.get('.circle_circle__xMxdD').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.clock().then((clock) => {
            clock.restore()
        })
    });

    it('Проверьте корректность добавления элемента в tail', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.button_button__-o8Pu').eq(1).click();

        cy.get('.circle_small__uHqmw').eq(0).contains(4);
        cy.get('.circle_small__uHqmw').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.circle_tail60__Q5Aq5').last().contains('tail');
        cy.get('.text_type_circle').last().contains(4);
        cy.get('.circle_circle__xMxdD').last().should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.get('.circle_circle__xMxdD').last().should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.clock().then((clock) => {
            clock.restore()
        })
    });


})