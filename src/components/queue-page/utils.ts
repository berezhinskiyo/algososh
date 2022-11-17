export const MAX_INPUT_LENGTH = 4;
export const MIN_INPUT_LENGTH = 1;
export const QUEUE_LENGTH = 7;


export class Queue<T> {
    private _container: (T | undefined)[] = [];
    private _head = 0;
    private _tail = 0;
    private readonly _size: number = 0;
    private _length: number = 0;
    private _defaultElement?: T;

    constructor(size: number, defaultElement?: T) {
        this._defaultElement = defaultElement;
        this._size = size;
        this._container = Array.from({ length: size }, (v, i) => {
            return Object.assign({}, defaultElement);
        });
    }

    enqueue = (item: T) => {
        if (this._length >= this._size) {
            throw new Error("Maximum length exceeded");
        }

        this._container[this._tail % this._size] = item;
        this._length++;
        this._tail++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this._container[Math.abs(this._head % this._size)] = this._defaultElement;
        this._length--;

        this._head = (this._head + 1) % this._size;

    };
    clear = () => {
        for (let i = 0; i < this._size; i++) {
            this._container[i] = Object.assign({}, this._defaultElement);
        }
        this._head = 0;
        this._tail = 0;
    }
    get head() { return this._head; }
    get tail() { return this._tail; }
    get elements() { return this._container; }
    get length() { return this._length; }
    get size() { return this._size; }

    isEmpty = () => this._length === 0;
}
