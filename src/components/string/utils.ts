import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../utils/types";
import { sleep, swap } from "../../utils/functions";
import { LONG_DELAY } from "../../utils/constants";

export const sort = async (arr: TCircle[], func: ({ }) => void, delay: number = LONG_DELAY) => {
    const { length } = arr;
    if (length === 1) {
        arr[0].state = ElementStates.Modified;
        func({});
        await sleep(delay);
        return;
    }
    for (let i = 0; i < length / 2; i++) {
        arr[length - 1 - i].state = ElementStates.Changing;
        arr[i].state = ElementStates.Changing;
        func({});
        await sleep(delay);
        swap(arr, i, length - 1 - i);
        arr[length - 1 - i].state = ElementStates.Modified;
        arr[i].state = ElementStates.Modified;
        func({});
        await sleep(delay);
    }
    return arr;
}