import React, { useState } from "react";
import styles from "./queue-page.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { sleep } from "../../utils/functions";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  const [, update] = useState({});
  const [collection, setCollection] = useState<Array<TCircle>>(Array.from({ length: 7 }, (v, i) => { return { id: i, circle: '', state: ElementStates.Default } as TCircle }));
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [head, setHead] = useState(-1);
  const [tail, setTail] = useState(-1);

  const add = async () => {
    setIsLoadingAdd(true);
    if (input.trim() !== '') {
      if (tail < 6) {
        if (tail < 0) {
          setHead(0);
          setTail(0);
          collection[0].state = ElementStates.Modified;
          collection[0].circle = input;
          collection[0].head = 'head';
          collection[0].tail = 'tail';
        }
        else if (tail === head && collection[tail].circle === '') {

          collection[tail].state = ElementStates.Modified;
          collection[tail].circle = input;
          collection[tail].tail = 'tail';
        }
        else {
          collection[tail].tail = '';
          setTail(tail + 1);
          collection[tail + 1].state = ElementStates.Modified;
          collection[tail + 1].circle = input;
          collection[tail + 1].tail = 'tail';
        }
        update({});
        await sleep(1000);
        if (tail === head && tail >= 0)
          collection[tail].state = ElementStates.Default;
        else
          collection[tail + 1].state = ElementStates.Default;
        update({});
        setInput('');
      }
    }
    setIsLoadingAdd(false);
  }
  const remove = async () => {
    setIsLoadingRemove(true);

    if (head >= 0 && head < 7) {
      collection[head].circle = '';
      if (head < 6 && head < tail) {
        setHead(head + 1);
        collection[head + 1].state = ElementStates.Modified;
        collection[head + 1].head = 'head';
        collection[head].head = '';
      }

      update({});
      await sleep(1000);
      if (head < 6 && head < tail) collection[head + 1].state = ElementStates.Default;
      update({});
      setInput('');
    }
    setIsLoadingRemove(false);
  }

  const clear = async () => {
    setIsLoading(true);
    for (let i = 0; i < collection.length; i++) {
      collection[i].circle = '';
      collection[i].head = '';
      collection[i].tail = '';
      collection[i].state = ElementStates.Default;
      setHead(-1);
      setTail(-1);

      await sleep(500);
      update({});
    }
    setIsLoading(false);
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input_box}>
        <Input value={input} name="input" id="input" placeholder="Введите текст" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button isLoader={isLoadingAdd} name="add_button" text="Добавить" onClick={add} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingRemove} name="remove_button1" text="Удалить" onClick={remove} extraClass={styles.button}></Button>
        <Button isLoader={isLoading} name="clear_button" text="Очистить" onClick={clear} extraClass={styles.button}></Button>
      </form>
      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state} head={e.head} index={e.id} tail={e.tail}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
