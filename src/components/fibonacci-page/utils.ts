export const MAX_FIBONACCI_NUMBER = 19;
export const MIN_FIBONACCI_NUMBER = 1;

export const getFibonacciNumbers = (n: number): Array<number> => {
    let result: Array<number> = [];

    for (let i = 0; i < n; i++) {
        if (i === 0 || i === 1) {
            result.push(1);
        } else {
            result.push(result[i - 1] + result[i - 2]);
        }
    }
    return result;
};