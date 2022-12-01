

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

    it('Проверьте корректность добавления элемента по индексу', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        cy.clock();
        cy.get('.input_input__bAnmr').eq(0)
            .type('4');
        cy.get('.input_input__bAnmr').eq(1)
            .type('2');
        cy.get('.button_button__-o8Pu').eq(4).click();

        cy.tick(1000);
        cy.get('.circle_small__uHqmw').eq(0).contains(4);
        cy.get('.circle_small__uHqmw').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('.circle_small__uHqmw').eq(0).contains(4);
        cy.get('.circle_small__uHqmw').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('.circle_head__E38zo').first().contains('head');
        cy.tick(1000);
        cy.get('.circle_head__E38zo').eq(1).should('have.value', '');
        cy.get('.text_type_circle').eq(2).contains(4);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(1000);
        cy.get('.circle_circle__xMxdD').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.clock().then((clock) => {
            clock.restore()
        })
    });

    it('Проверьте корректность удаления элемента из head', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);

        let initialCount = 0;
        cy.get('.text_type_circle').then($els => {
            initialCount = $els.length;
            let text = '';
            cy.get('.text_type_circle').eq(0).should(($p) => {
                text = $p.text();
            }).then(() => {
                cy.clock();
                cy.get('.button_button__-o8Pu').eq(2).click();
                cy.get('.circle_small__uHqmw').eq(0).contains(text);

                cy.get('.text_type_circle').eq(0).should('have.value', '');
                cy.tick(1000);
                cy.get('.text_type_circle').should('have.length', initialCount - 1);
                cy.clock().then((clock) => {
                    clock.restore()
                });
            });
        });
    });

    it('Проверьте корректность удаления элемента из tail', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);

        let initialCount = 0;
        cy.get('.text_type_circle').then($els => {
            initialCount = $els.length;
            let text = '';
            cy.get('.text_type_circle').last().should(($p) => {
                text = $p.text();
            }).then(() => {
                cy.clock();
                cy.get('.button_button__-o8Pu').eq(3).click();
                cy.get('.circle_small__uHqmw').eq(0).contains(text);

                cy.get('.text_type_circle').last().should('have.value', '');
                cy.tick(1000);
                cy.get('.text_type_circle').should('have.length', initialCount - 1);
                cy.clock().then((clock) => {
                    clock.restore()
                });
            });
        });
    });

    it('Проверьте корректность удаления элемента по индексу', () => {
        cy.visit(`${Cypress.env('base_url')}${Cypress.env('list')}`);
        const index = 2;
        cy.get('.input_input__bAnmr').eq(1)
            .type(index);
        let initialCount = 0;
        cy.get('.text_type_circle').then($els => {
            initialCount = $els.length;
            let text = '';
            cy.get('.text_type_circle').eq(2).should(($p) => {
                text = $p.text();
            }).then(() => {
                cy.clock();

                cy.get('*[class*="button_button"]').eq(6).click();
                cy.tick(500);
                for (let i = 0; i < index; i++) {
                    cy.get('*[class^="circle_circle__"]').eq(i).should('have.css', 'border-color', 'rgb(210, 82, 225)');
                    cy.tick(500);
                }
                cy.get('*[class^="circle_circle__"]').eq(index).should('have.css', 'border-color', 'rgb(210, 82, 225)');
                cy.get('.circle_small__uHqmw').eq(0).contains(text);
                cy.get('.text_type_circle').last().should('have.value', '');
                cy.tick(1000);
                for (let i = 1; i < index; i++) {
                    cy.tick(500);
                    cy.get('*[class^="circle_circle__"]').eq(index - i).should('have.css', 'border-color', 'rgb(0, 50, 255)');
                    //cy.get('.circle_circle__xMxdD').eq(index - i).should('have.css', 'border-color', 'rgb(0, 50, 255)');

                }
                cy.get('.text_type_circle').should('have.length', initialCount - 1);
                cy.clock().then((clock) => {
                    clock.restore()
                });
            });
        });
    });
});
