import { bubbleSort, selectionSort } from "./utils";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Direction } from "../../types/direction";

jest.setTimeout(30000);
const testCaseBubbleSort = async (src, direction) => {
    let original = src.map((e, i) => { return { id: i, circle: e, state: ElementStates.Default } });
    await bubbleSort(original, direction, () => { }, 0);
    return original.map((e, i) => e.circle);
}
describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
    it('Корректно сортирует пустой массив', async () => {
        expect(await testCaseBubbleSort([], Direction.Ascending)).toEqual([]);
        expect(await testCaseBubbleSort([], Direction.Descending)).toEqual([]);
    });

    it('Корректно сортирует массив из одного элемента', async () => {
        expect(await testCaseBubbleSort([3], Direction.Ascending)).toEqual([3]);
        expect(await testCaseBubbleSort([3], Direction.Descending)).toEqual([3]);
    });

    it('Корректно сортирует массив из нескольких элементов', async () => {
        console.log(await testCaseBubbleSort([3, 1, 2, 4], Direction.Ascending));

        expect(await testCaseBubbleSort([3, 1, 2, 4], Direction.Ascending)).toEqual([1, 2, 3, 4]);
        expect(await testCaseBubbleSort([3, 1, 2, 4], Direction.Descending)).toEqual([4, 3, 2, 1]);

    });

});