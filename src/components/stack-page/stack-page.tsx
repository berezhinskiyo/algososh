
import React, { useState } from "react";
import styles from "./stack-page.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { sleep } from "../../utils/functions";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack, MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from "./utils";

export const StackPage: React.FC = () => {
  const [, update] = useState({});
  const [stack] = useState<Stack<TCircle>>(new Stack<TCircle>());
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);


  const add = async () => {
    setIsLoadingAdd(true);

    if (stack.size > 0) stack.elements[stack.size - 1].head = '';
    stack.push({ id: 0, circle: input, state: ElementStates.Changing, head: 'top' } as TCircle);
    update({});
    await sleep(1000);
    stack.elements[stack.size - 1].state = ElementStates.Default;
    update({});
    setInput('');

    setIsLoadingAdd(false);
  }
  const remove = async () => {
    setIsLoadingRemove(true);
    if (stack.size > 0) {
      if (stack.size > 1) {
        stack.elements[stack.size - 2].head = 'top';
        stack.elements[stack.size - 2].state = ElementStates.Changing;
      }
      stack.pop();
      update({});
      await sleep(1000);
      if (stack.size > 0) stack.elements[stack.size - 1].state = ElementStates.Default;
      update({});
      setInput('');
    }
    setIsLoadingRemove(false);
  }
  const clear = async () => {
    setIsLoading(true);

    stack.clear();
    await sleep(500);
    update({});

    setInput('');
    setIsLoading(false);

  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    setIsInputValid(event.currentTarget.value.length <= MAX_INPUT_LENGTH && event.currentTarget.value.length >= MIN_INPUT_LENGTH);
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_box}>
        <Input disabled={isLoadingAdd || isLoadingRemove || isLoading} value={input} name="input" id="input" placeholder="Введите текст" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button disabled={!isInputValid || isLoadingRemove || isLoading}
          isLoader={isLoadingAdd} name="add_button" text="Добавить" onClick={add} extraClass={styles.button}></Button>
        <Button disabled={isLoadingAdd || !isInputValid || isLoading}
          isLoader={isLoadingRemove} name="remove_button1" text="Удалить" onClick={remove} extraClass={styles.button}></Button>
        <Button disabled={isLoadingAdd || isLoadingRemove || !isInputValid}
          isLoader={isLoading} name="clear_button" text="Очистить" onClick={clear} extraClass={styles.button}></Button>
      </form>
      <div className={styles.circle_box}>
        {stack.elements.map((e, i) => <Circle letter={e.circle} key={i} state={e.state} head={e.head} index={i} ></Circle>)}
      </div>
    </SolutionLayout>
  );
};
