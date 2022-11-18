export const MAX_INPUT_LENGTH = 4;
export const MIN_INPUT_LENGTH = 1;




export class Stack<T>  {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    clear = (): void => {

        while (this.container.length > 0)
            this.container.pop();
    };

    get size() { return this.container.length; }
    get elements() { return this.container; }
}

