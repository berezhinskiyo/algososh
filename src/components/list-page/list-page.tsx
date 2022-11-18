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
import { SHORT_DELAY, LONG_DELAY, HEAD, TAIL } from "../../utils/constants";
import { LinkedList, MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from "./utils";


export const ListPage: React.FC = () => {
  const [, update] = useState({});

  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState<boolean>(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState<boolean>(false);
  const [isLoadingRemoveHead, setIsLoadingRemoveHead] = useState<boolean>(false);
  const [isLoadingRemoveTail, setIsLoadingRemoveTail] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [input, setInput] = useState('');
  const [isInputIndexValid, setIsInputIndexValid] = useState(false);
  const [inputIndex, setInputIndex] = useState('');
  const [list] = useState<LinkedList<TCircle>>(new LinkedList<TCircle>(
    Array.from({ length: Math.floor(Math.random() * 4) + 3 }, () => Math.floor(Math.random() * 6))
      .map<TCircle>((e, i, arr) => {
        return {
          id: i, circle: e.toString(), state: ElementStates.Default,
          head: i === 0 ? HEAD : '',
          tail: i === arr.length - 1 ? TAIL : ''
        } as TCircle;
      })))

  const setHeadTail = () => {
    if (list.head) list.head.value.head = HEAD;
    if (list.tail) list.tail.value.tail = TAIL;
  }


  const addHead = async () => {
    setIsLoadingAddHead(true);
    if (input.trim().length > 0) {
      if (!list.head) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: HEAD });
        tmp.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        list.prepend(tmp);
        update({});
        await sleep(LONG_DELAY);
        tmp.state = ElementStates.Default;
        tmp.head = HEAD;
        tmp.tail = TAIL;
      } else {
        list.head.value.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        update({});
        await sleep(LONG_DELAY);

        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: HEAD });
        list.head.value.head = ''
        list.prepend(tmp);
        update({});
        await sleep(SHORT_DELAY);

        tmp.state = ElementStates.Default;
      }
      setHeadTail();
      setInput('');
      setIsInputValid(false);
    }
    setIsLoadingAddHead(false);
  }


  const addTail = async () => {
    setIsLoadingAddTail(true);
    if (input.trim().length > 0) {
      if (!list.tail) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: HEAD });
        tmp.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        list.append(tmp);
        update({});
        await sleep(LONG_DELAY);
        tmp.state = ElementStates.Default;
        tmp.head = HEAD;
        tmp.tail = TAIL;
      } else {
        list.tail.value.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        update({});
        await sleep(LONG_DELAY);
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, tail: TAIL });
        list.tail.value.head = '';
        if (list.tail.value.head) list.tail.value.head = HEAD;
        list.tail.value.tail = ''
        list.append(tmp);
        update({});
        await sleep(SHORT_DELAY);
        tmp.state = ElementStates.Default;
      }
      setInput('');
      setHeadTail();
      setIsInputValid(false);
    }
    setIsLoadingAddTail(false);
  }
  const removeHead = async () => {
    setIsLoadingRemoveHead(true);
    if (list.head) {
      list.head.value.tail = (<Circle letter={list.head.value.circle} state={ElementStates.Changing} isSmall={true} ></Circle>);
      list.head.value.circle = ''
      await sleep(LONG_DELAY);
      update({});
      list.deleteHead();
      setHeadTail();
    }
    setIsLoadingRemoveHead(false);
  }
  const removeTail = async () => {
    setIsLoadingRemoveTail(true);
    if (list.tail) {
      list.tail.value.tail = (<Circle letter={list.tail.value.circle} state={ElementStates.Changing} isSmall={true} ></Circle>);
      list.tail.value.circle = ''
      await sleep(LONG_DELAY);
      update({});
      list.tail.value.tail = '';
      list.deleteTail();
      setHeadTail();
      update({});
    }
    setIsLoadingRemoveTail(false);
  }
  const addIndex = async () => {
    setIsLoadingAdd(true);
    if (input.trim().length > 0 && inputIndex.trim().length > 0) {
      if (!list.head) {
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: HEAD });
        tmp.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        list.prepend(tmp);
        await sleep(SHORT_DELAY);
        update({});
        tmp.state = ElementStates.Default;
        tmp.head = HEAD;
        tmp.tail = TAIL;
      } else if (list.head && 0 === Number.parseInt(inputIndex)) {
        list.head.value.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);
        await sleep(LONG_DELAY);
        update({});
        let tmp: TCircle = ({ id: 0, circle: input, state: ElementStates.Modified, head: HEAD });
        list.head.value.head = '';
        list.addByIndex(Number.parseInt(inputIndex), tmp);
        update({});
        await sleep(SHORT_DELAY);
        tmp.state = ElementStates.Default;
      } else {

        let arr = list.toArray();

        for (let i = 0; i < arr.length; i++) {
          let e = arr[i].value;
          let prev: TCircle | undefined = undefined;
          if (i > 0) prev = arr[i - 1].value;

          e.head = (<Circle letter={input} state={ElementStates.Changing} isSmall={true} ></Circle>);

          if (prev && i === 1) prev.head = HEAD;
          else if (prev) prev.head = ''
          await sleep(SHORT_DELAY);
          update({});
          e.state = ElementStates.Changing;

          if (i === Number.parseInt(inputIndex)) {
            let tmp: TCircle = ({ id: Number.parseInt(inputIndex) + 1, circle: input, state: ElementStates.Modified });
            list.addByIndex(Number.parseInt(inputIndex), tmp)
            if (e && e.id === 0) e.head = HEAD;
            else if (e && e.id !== 0) e.head = ''
            update({});
            await sleep(SHORT_DELAY);
            tmp.state = ElementStates.Default;
            break;
          }
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].value.state = ElementStates.Default;
        }
      }

      setInput('');
      setIsInputValid(false);
      setInputIndex('');
      setIsInputIndexValid(false);
    }
    setIsLoadingAdd(false);
  }

  const removeIndex = async () => {
    setIsLoadingRemove(true);
    if (list.head && inputIndex.trim().length > 0 && Number.parseInt(inputIndex) >= 0 && Number.parseInt(inputIndex) < list.length()) {

      let arr = list.toArray();

      for (let i = 0; i < arr.length; i++) {
        let e = arr[i].value;


        e.state = ElementStates.Changing;
        e.state = ElementStates.Changing;
        await sleep(SHORT_DELAY);
        update({});

        if (i === Number.parseInt(inputIndex)) {
          e.tail = (<Circle letter={e.circle} state={ElementStates.Changing} isSmall={true} ></Circle>);
          e.circle = '';
          update({});
          await sleep(LONG_DELAY);

          list.deleteByIndex(Number.parseInt(inputIndex))
          update({});
          await sleep(SHORT_DELAY);
          break;
        }
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i].value.state = ElementStates.Default;
      }
      setHeadTail();

    }

    setInputIndex('');
    setIsInputIndexValid(false);
    setIsLoadingRemove(false);
  }

  const render = () => {
    const result: Array<ReactElement> = [];
    let arr = list.toArray();

    for (let i = 0; i < arr.length; i++) {
      let e = arr[i].value;
      result.push(<Circle letter={e?.circle} key={i} state={e?.state} head={e?.head} index={i} tail={e?.tail}></Circle>);

      if (i < arr.length - 1) {
        result.push(<ArrowIcon key={i + 100}></ArrowIcon>);
      }
    }
    return result;
  }
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    setIsInputValid(event.currentTarget.value.length <= MAX_INPUT_LENGTH && event.currentTarget.value.length >= MIN_INPUT_LENGTH);
  }
  const handleOnChangeIndex = (event: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(event.currentTarget.value);
    let index = Number.parseInt(event.currentTarget.value);
    setIsInputIndexValid(index >= 0 && index < list.length())
  }

  return (
    <SolutionLayout title="Связный список">

      <div className={styles.input_box}>
        <Input disabled={isLoadingAddHead || isLoadingAddTail || isLoadingRemoveHead || isLoadingRemoveTail || isLoadingAdd || isLoadingRemove}
          value={input} name="input" id="input" placeholder="Введите значение" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button disabled={!isInputValid || isLoadingAddTail || isLoadingRemoveHead || isLoadingRemoveTail || isLoadingAdd || isLoadingRemove}
          isLoader={isLoadingAddHead} name="add_head" text="Добавить head" onClick={addHead} extraClass={styles.button}></Button>
        <Button disabled={!isInputValid || isLoadingAddHead || isLoadingRemoveHead || isLoadingRemoveTail || isLoadingAdd || isLoadingRemove}
          isLoader={isLoadingAddTail} name="add_tail" text="Добавить tail" onClick={addTail} extraClass={styles.button}></Button>
        <Button disabled={list.length() < 0 || isLoadingAddHead || isLoadingAddTail || isLoadingRemoveTail || isLoadingAdd || isLoadingRemove}
          isLoader={isLoadingRemoveHead} name="remove_head" text="Удалить head" onClick={removeHead} extraClass={styles.button}></Button>
        <Button disabled={list.length() < 0 || isLoadingAddHead || isLoadingAddTail || isLoadingRemoveHead || isLoadingAdd || isLoadingRemove}
          isLoader={isLoadingRemoveTail} name="remove_tail" text="Удалить tail" onClick={removeTail} extraClass={styles.button}></Button>
      </div>
      <div className={styles.input_box}>
        <Input disabled={isLoadingAddHead || isLoadingAddTail || isLoadingRemoveHead || isLoadingRemoveTail || isLoadingAdd || isLoadingRemove}
          value={inputIndex} name="index" id="index" placeholder="Введите индекс" type="number" extraClass={styles.input} onChange={handleOnChangeIndex}></Input>
        <Button disabled={!isInputValid || !isInputIndexValid || isLoadingAddHead || isLoadingAddTail || isLoadingRemoveTail || isLoadingRemoveHead || isLoadingRemove}
          isLoader={isLoadingAdd} name="add_index" text="Добавить по индексу" onClick={addIndex} extraClass={styles.big_button}></Button>
        <Button disabled={!isInputIndexValid || isLoadingAddHead || isLoadingAddTail || isLoadingRemoveTail || isLoadingRemoveHead || isLoadingAdd}
          isLoader={isLoadingRemove} name="remove_index" text="Удалить по индексу" onClick={removeIndex} extraClass={styles.big_button}></Button>
      </div>

      <div className={styles.circle_box}>
        {render()}
      </div>
    </SolutionLayout>
  );
};
