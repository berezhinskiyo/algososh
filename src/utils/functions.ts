export const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  });
};

export function swap<T>(arr: Array<T>, firstIndex: number, secondIndex: number): void {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

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

