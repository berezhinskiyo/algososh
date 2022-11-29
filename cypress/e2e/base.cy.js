
const check = (additionUrl, value1) => {
    cy.visit(`${Cypress.env('base_url')}${Cypress.env(additionUrl)}`);
    cy.contains(value1);
}
describe('Тестирование работоспособности приложения', () => {
    it('Напишите тест, который будет проверять, что ваше приложение поднялось', () => {

        cy.visit(Cypress.env('base_url'));
        cy.contains('МБОУ АЛГОСОШ');

    });
    it('Необходимо удостовериться, что 6 страниц с визуализацией алгоритмов будут доступны пользователю', () => {

        check('recursion', 'Строка');
        check('fibonacci', 'Последовательность Фибоначчи');
        check('sorting', 'Сортировка массива');
        check('stack', 'Стек');
        check('queue', 'Очередь');
        check('list', 'Связный список');

    });
})