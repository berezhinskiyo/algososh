import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../utils/types";
import { sleep, swap } from "../../utils/functions";
import { SHORT_DELAY } from "../../utils/constants";
import { Direction } from "../../types/direction";

export const ARRAY_LENGTH = 100;
export const RANDOM_START = 3;
export const RANDOM_RANGE = 14;

export const selectionSort = async (arr: TCircle[], deriction: Direction, update: ({ }) => void, delay: number = SHORT_DELAY) => {
    const { length } = arr;
    arr.forEach(t => t.state = ElementStates.Default);
    for (let i = 0; i < length; i++) {
        let maxInd = i;
        arr[i].state = ElementStates.Changing;
        for (let j = i + 1; j < length; j++) {
            if (arr[j].state !== ElementStates.Modified) arr[j].state = ElementStates.Changing;
            if (j > i + 1 && arr[j - 1].state !== ElementStates.Modified) arr[j - 1].state = ElementStates.Default;
            update({});
            await sleep(delay);
            if (deriction === Direction.Ascending) {
                if (Number.parseInt(arr[maxInd].circle) > Number.parseInt(arr[j].circle)) {
                    maxInd = j;
                }
            }
            else {
                if (Number.parseInt(arr[maxInd].circle) < Number.parseInt(arr[j].circle)) {
                    maxInd = j;
                }
            }
        }
        if (i < length - 2) arr[length - 1].state = ElementStates.Default;
        if (i !== maxInd) {
            if (i < length - 2) arr[i].state = ElementStates.Default;
            swap(arr, i, maxInd);
        }
        arr[i].state = ElementStates.Modified;
        update({});
        await sleep(SHORT_DELAY);

    }

};

export const bubbleSort = async (arr: TCircle[], deriction: Direction, update: ({ }) => void, delay: number = SHORT_DELAY) => {
    const { length } = arr;
    arr.forEach(t => t.state = ElementStates.Default);
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            arr[j + 1].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            update({});
            await sleep(delay);
            if (deriction === Direction.Ascending) {
                if (Number.parseInt(arr[j].circle) > Number.parseInt(arr[j + 1].circle)) {
                    swap(arr, j, j + 1)
                }
            }
            else {
                if (Number.parseInt(arr[j].circle) < Number.parseInt(arr[j + 1].circle)) {
                    swap(arr, j, j + 1)
                }
            }
            arr[j].state = ElementStates.Default;
        }
        arr[length - i - 1].state = ElementStates.Modified;
        await sleep(SHORT_DELAY);
        update({});

    }

};