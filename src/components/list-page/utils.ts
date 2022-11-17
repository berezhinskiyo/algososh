import { TCircle } from "../../utils/types";
export const MAX_INPUT_LENGTH = 4;
export const MIN_INPUT_LENGTH = 1;
export const HEAD = 'head';
export const TAIL = 'tail';

export class LinkedListNode<T extends TCircle> {
    value: T;
    next?: LinkedListNode<T>;
    constructor(value: T, next?: LinkedListNode<T>) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T extends TCircle> {
    head?: LinkedListNode<T>;
    tail?: LinkedListNode<T>;

    constructor(arr?: Array<T>) {
        let prev: LinkedListNode<T> | null = null;
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                const curr = new LinkedListNode<T>(arr[i]);
                if (prev) prev.next = curr;
                if (i === 0) this.head = curr;
                else if (i === arr.length - 1) {
                    this.tail = curr;
                }
                prev = curr;
            }
        }
    }
    prepend(value: T) {
        if (this.head) {
            this.head = new LinkedListNode<T>(value, this.head);
        }
        else {
            this.head = new LinkedListNode<T>(value);
            this.tail = this.head;
        }
    }
    append(value: T) {
        if (this.tail) {
            this.tail.next = new LinkedListNode<T>(value)
            this.tail = this.tail?.next;
        }
        else {
            this.head = new LinkedListNode<T>(value);
            this.tail = this.head;
        }
    }
    addByIndex(index: Number, value: T) {
        let i = 0;
        let arr = this.toArray();
        for (let i = 0; i < arr.length; i++) {
            let curr = arr[i];
            if (i === index) {
                if (i === 0)
                    this.head = new LinkedListNode<T>(value, curr);
                else {
                    arr[i - 1].next = new LinkedListNode<T>(value, curr);
                }
                break;
            }
        }

    }
    deleteByIndex(index: Number) {
        let i = 0;
        let curr: LinkedListNode<T> | undefined = this.head;
        let prev: LinkedListNode<T> | undefined = undefined;
        let arr = this.toArray();
        for (let i = 0; i < arr.length; i++) {
            if (i === index) {
                if (i > 0) {
                    arr[i - 1].next = arr[i].next;
                    if (i === arr.length - 1) {
                        this.tail = arr[i - 1];
                        arr[i - 1].next = undefined;
                    }
                } else {
                    this.head = arr[i].next;
                    if (this.head && !this.head.next) this.tail = this.head;
                }
                break;
            }
        }
    }
    deleteHead() {
        this.deleteByIndex(0);
    }
    deleteTail() {
        this.deleteByIndex(this.length() - 1);
    }
    length(): number {
        let i = 0;
        let curr: LinkedListNode<T> | undefined = this.head;
        while (curr) {
            i++;
            curr = curr.next;
        }
        return i;
    }
    toArray(): LinkedListNode<T>[] {
        const result: LinkedListNode<T>[] = [];
        let curr: LinkedListNode<T> | undefined = this.head;
        while (curr) {
            result.push(curr);
            curr = curr.next;
        }
        return result;
    }
}