import { Button } from "./button";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Тестирование кнопки', () => {
    it('кнопки с текстом', () => {
        const tree = renderer
            .create(<Button text="Ок" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('кнопки без текста', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('заблокированной кнопки', () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('кнопки с индикацией загрузки', () => {
        const tree = renderer
            .create(<Button isLoader />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Проверяем корректность вызова колбека при клике на кнопку', () => {
        window.alert = jest.fn();

        render(<Button text="Ok" onClick={() => {
            alert('Работает')
        }} />)

        const link = screen.getByText("Ok");

        fireEvent.click(link);
        expect(window.alert).toHaveBeenCalledWith('Работает');
    });
});