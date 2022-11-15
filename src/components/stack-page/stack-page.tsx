
import React, { useState } from "react";
import styles from "./stack-page.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { sleep } from "../../utils/functions";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  const [, update] = useState({});
  const [collection, setCollection] = useState<Array<TCircle>>([]);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState('');


  const add = async () => {
    setIsLoadingAdd(true);
    if (input.length > 0) {
      if (collection.length > 0) collection[collection.length - 1].head = '';
      collection.push({ id: collection.length, circle: input, state: ElementStates.Modified, head: 'top' } as TCircle);
      update({});
      await sleep(1000);
      collection[collection.length - 1].state = ElementStates.Default;
      update({});
      setInput('');
    }
    setIsLoadingAdd(false);
  }
  const remove = async () => {
    setIsLoadingRemove(true);
    if (collection.length > 0) {
      if (collection.length > 1) {
        collection[collection.length - 2].head = 'top';
        collection[collection.length - 2].state = ElementStates.Modified;
      }
      collection.pop();
      update({});
      await sleep(1000);
      if (collection.length > 0) collection[collection.length - 1].state = ElementStates.Default;
      update({});
      setInput('');
    }
    setIsLoadingRemove(false);
  }
  const clear = async () => {
    setIsLoading(true);
    while (collection.length > 0) {
      collection.pop();
      await sleep(500);
      update({});
    }
    setInput('');
    setIsLoading(false);

  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_box}>
        <Input value={input} name="input" id="input" placeholder="Введите текст" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button isLoader={isLoadingAdd} name="add_button" text="Добавить" onClick={add} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingRemove} name="remove_button1" text="Удалить" onClick={remove} extraClass={styles.button}></Button>
        <Button isLoader={isLoading} name="clear_button" text="Очистить" onClick={clear} extraClass={styles.button}></Button>
      </form>
      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state} head={e.head} tail={e.id.toString()} ></Circle>)}
      </div>
    </SolutionLayout>
  );
};
