import { sort } from "./utils";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.setTimeout(30000);
const testCase = async (src) => {
    let original = src.split('').map((e, i) => { return { id: i, circle: e, state: ElementStates.Default } });
    await sort(original, () => { }, 0);
    return original.reduce((accumulator, currentValue) => accumulator + currentValue.circle, '');
}
describe('Тестирование алгоритма разворота строки', () => {
    it('Корректно разворачивает строку с чётным количеством символов', async () => {
        expect(await testCase('1234')).toBe('4321');
    });

    it('Корректно разворачивает строку с нечетным количеством символов', async () => {
        expect(await testCase('12345')).toBe('54321');
    });

    it('Корректно разворачивает строку с одним символом', async () => {
        expect(await testCase('1')).toBe('1');
    });

    it('Корректно разворачивает строку без символов', async () => {
        expect(await testCase('')).toBe('');
    });

});