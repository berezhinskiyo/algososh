import React, { ReactElement, useState } from "react";
import styles from "./list-page.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { sleep } from "../../utils/functions";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { resourceUsage } from "process";

export const ListPage: React.FC = () => {
  const [, update] = useState({});

  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState<boolean>(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState<boolean>(false);
  const [isLoadingRemoveHead, setIsLoadingRemoveHead] = useState<boolean>(false);
  const [isLoadingRemoveTail, setIsLoadingRemoveTail] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [head, setHead] = useState<TCircle>();
  const [tail, setTail] = useState<TCircle>();
  const renumerate = (h: TCircle | undefined) => {
    let e: TCircle | undefined = h;
    let i: number = 0;
    while (e) {
      e.id = i;
      i++;
      e.state = ElementStates.Default;
      e = e?.next;
    }
  }
  const getTail = (t: TCircle, h: TCircle | undefined): TCircle | undefined => {
    let e: TCircle | undefined = h;
    while (e) {
      if (e.next && e.next.id === t.id) break;
      e = e?.next;
    }
    return e;
  }
  const getItem = (h: TCircle, id: number): TCircle | undefined => {
    let e: TCircle | undefined = h;
    while (e) {
      if (e.next && e.next.id === id) break;
      e = e.next;
    }
    return e;
  }
  const hasIndex = (h: TCircle, id: number): boolean => {
    let res: boolean = false;
    let e: TCircle | undefined = h;
    while (e) {
      if (e.id === id) {
        res = true;
        break;
      }
      e = e.next;
    }
    return res;
  }
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  }
  const handleOnChangeIndex = (event: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(event.currentTarget.value);
  }
  const addHead = async () => {
    setIsLoadingAddHead(true);
    if (input.trim().length > 0) {
      if (!head) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: 'head' });
        tmp.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        setHead(tmp);
        setTail(tmp);
        await sleep(1000);
        update({});
        tmp.state = ElementStates.Default;
        tmp.head = 'head';
        tmp.tail = 'tail';
      } else {
        head.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        await sleep(1000);
        update({});
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: 'head', next: head });
        head.head = ''
        setHead(tmp);
        renumerate(tmp);
        await sleep(500);
        update({});
        tmp.state = ElementStates.Default;
      }
      setInput('');
    }
    setIsLoadingAddHead(false);
  }
  const addTail = async () => {
    setIsLoadingAddTail(true);
    if (input.trim().length > 0) {
      if (!tail) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: 'head' });
        tmp.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        setHead(tmp);
        setTail(tmp);
        await sleep(1000);
        update({});
        tmp.state = ElementStates.Default;
        tmp.head = 'head';
        tmp.tail = 'tail';
      } else {
        tail.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        await sleep(1000);
        update({});
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, tail: 'tail' });
        tail.head = '';
        if (head) head.head = 'head';
        tail.next = tmp;
        tail.tail = ''
        setTail(tmp);
        if (head) renumerate(head);
        await sleep(500);
        update({});
        tmp.state = ElementStates.Default;
      }
      setInput('');
    }
    setIsLoadingAddTail(false);
  }
  const removeHead = async () => {
    setIsLoadingRemoveHead(true);
    if (head) {
      head.head = (<Circle letter={head.circle} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
      head.circle = ''
      await sleep(1000);
      update({});
      if (head.next) {
        setHead(head.next);
        head.next.head = 'head';
        renumerate(head.next);
      } else {
        setHead(undefined);
        setTail(undefined);
      }
    }
    setIsLoadingRemoveHead(false);
  }
  const removeTail = async () => {
    setIsLoadingRemoveTail(true);
    if (tail) {
      tail.tail = (<Circle letter={tail.circle} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
      tail.circle = ''
      await sleep(1000);
      update({});
      tail.tail = '';
      if (head && tail && head.id === tail.id) {
        setHead(undefined);
        setTail(undefined);
      } else {
        const tmp: TCircle | undefined = getTail(tail, head);
        if (tmp) {
          tmp.tail = 'tail';
          tmp.next = undefined;
          setTail(tmp);

          renumerate(head);
        }

      }
    }
    setIsLoadingRemoveTail(false);
  }
  const addIndex = async () => {
    setIsLoadingAdd(true);
    if (input.trim().length > 0 && inputIndex.trim().length > 0) {
      if (!head) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: 'head' });
        tmp.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        setHead(tmp);
        setTail(tmp);
        await sleep(500);
        update({});
        tmp.state = ElementStates.Default;
        tmp.head = 'head';
        tmp.tail = 'tail';
      } else if (head && head.id === Number.parseInt(inputIndex)) {
        head.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
        await sleep(1000);
        update({});
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: 'head', next: head });
        head.head = ''
        setHead(tmp);
        renumerate(tmp);
        await sleep(500);
        update({});
        tmp.state = ElementStates.Default;
      } else if (hasIndex(head, Number.parseInt(inputIndex))) {

        let e: TCircle | undefined = head;
        let prev: TCircle | undefined = undefined;
        while (e) {

          e.head = (<Circle letter={input} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
          e.state = ElementStates.Changing;
          if (prev && prev.id === head.id) prev.head = 'head';
          else if (prev && prev.id !== head.id) prev.head = ''
          await sleep(500);
          update({});

          if (e.next && e.next.id === Number.parseInt(inputIndex)) {
            let tmp: TCircle = ({ id: e.next.id, circle: input, state: ElementStates.Modified, next: e.next });
            e.next = tmp;
            if (e && e.id === head.id) e.head = 'head';
            else if (e && e.id !== head.id) e.head = ''
            renumerate(head);
            await sleep(500);
            update({});
            tmp.state = ElementStates.Default;
            break;
          }


          prev = e;
          e = e.next;
        }
      }
      setInput('');
      setInputIndex('');
    }
    setIsLoadingAdd(false);
  }

  const removeIndex = async () => {
    setIsLoadingRemove(true);
    if (head && inputIndex.trim().length > 0 && hasIndex(head, Number.parseInt(inputIndex))) {

      let e: TCircle | undefined = head;
      let prev: TCircle | undefined = undefined;
      while (e) {

        e.state = ElementStates.Changing;
        await sleep(500);
        update({});

        if (e.id === Number.parseInt(inputIndex)) {
          e.tail = (<Circle letter={e.circle} key='1000' state={ElementStates.Changing} isSmall={true} ></Circle>);
          e.circle = '';
          update({});
          await sleep(1000);

          if (prev) {
            prev.next = e.next;
            renumerate(head);
          } else if (!prev && e.next) {
            e.next.head = 'head';
            setHead(e.next);
            renumerate(e.next);
          }
          if (prev && !e.next) {
            prev.next = undefined;
            prev.tail = 'tail'
            renumerate(head);
          } else if (!prev && !e.next) {

            setHead(undefined);
            setTail(undefined);
          }

          update({});
          await sleep(500);

          break;
        }
        prev = e;
        e = e.next;
      }
    }
    setInputIndex('');
    setIsLoadingRemove(false);
  }

  const render = () => {
    const result: Array<ReactElement> = [];
    let e: TCircle | undefined = head;
    let i: number = 0;
    while (e) {
      result.push(<Circle letter={e?.circle} key={i++} state={e?.state} head={e?.head} index={e?.id} tail={e?.tail}></Circle>);

      if (e?.next !== undefined) {
        result.push(<ArrowIcon key={i++}></ArrowIcon>);
      }
      e = e?.next;
    }
    return result;
  }


  return (
    <SolutionLayout title="Связный список">

      <div className={styles.input_box}>
        <Input value={input} name="input" id="input" placeholder="Введите значение" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button isLoader={isLoadingAddHead} name="add_head" text="Добавить head" onClick={addHead} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingAddTail} name="add_tail" text="Добавить tail" onClick={addTail} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingRemoveHead} name="remove_head" text="Удалить head" onClick={removeHead} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingRemoveTail} name="remove_tail" text="Удалить tail" onClick={removeTail} extraClass={styles.button}></Button>
      </div>
      <div className={styles.input_box}>
        <Input value={inputIndex} name="index" id="index" placeholder="Введите индекс" type="number" extraClass={styles.input} onChange={handleOnChangeIndex}></Input>
        <Button isLoader={isLoadingAdd} name="add_index" text="Добавить по индексу" onClick={addIndex} extraClass={styles.big_button}></Button>
        <Button isLoader={isLoadingRemove} name="remove_index" text="Удалить по индексу" onClick={removeIndex} extraClass={styles.big_button}></Button>
      </div>

      <div className={styles.circle_box}>
        {render()}
      </div>
    </SolutionLayout>
  );
};
