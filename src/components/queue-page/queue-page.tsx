import React, { useState } from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { sleep } from "../../utils/functions";
import { TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue, MAX_INPUT_LENGTH, MIN_INPUT_LENGTH, QUEUE_LENGTH } from "./utils";
import { LOND_DELAY, HEAD, TAIL } from "../../utils/constants";

export const QueuePage: React.FC = () => {
  const [, update] = useState({});
  const [queue] = useState<Queue<TCircle>>(new Queue(QUEUE_LENGTH, { id: 0, circle: '', state: ElementStates.Default } as TCircle));
  //(Array.from({ length: 7 }, (v, i) => { return { id: i, circle: '', state: ElementStates.Default } as TCircle }));
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [input, setInput] = useState('');



  const add = async () => {
    setIsLoadingAdd(true);

    if (queue.tail < QUEUE_LENGTH) {
      queue.enqueue({ id: 0, circle: '', state: ElementStates.Changing } as TCircle);

      update({});
      await sleep(LOND_DELAY);

      if (queue.elements[queue.head]) (queue.elements[queue.head] as TCircle).head = HEAD;
      if (queue.elements[queue.tail - 1]) (queue.elements[queue.tail - 1] as TCircle).circle = input;
      if (queue.elements[queue.tail - 1]) (queue.elements[queue.tail - 1] as TCircle).tail = TAIL;
      if (queue.elements[queue.tail - 1]) (queue.elements[queue.tail - 1] as TCircle).state = ElementStates.Default;
      if (queue.tail > 1 && queue.elements[queue.tail - 2]) (queue.elements[queue.tail - 2] as TCircle).tail = '';

      update({});
      setInput('');
      setIsInputValid(false);
    }

    setIsLoadingAdd(false);
  }
  const remove = async () => {
    setIsLoadingRemove(true);
    if (queue.head >= 0 && queue.head < QUEUE_LENGTH) {
      if (queue.elements[queue.head]) (queue.elements[queue.head] as TCircle).state = ElementStates.Changing;
      update({});
      await sleep(LOND_DELAY);
      if (queue.elements[queue.head]) (queue.elements[queue.head] as TCircle).state = ElementStates.Default;
      if (queue.length <= 1) queue.clear();
      else {
        queue.dequeue();
        if (queue.elements[queue.head]) (queue.elements[queue.head] as TCircle).head = HEAD;
        if (queue.elements[queue.tail - 1]) (queue.elements[queue.tail - 1] as TCircle).tail = TAIL;
      }
      update({});

      setInput('');
      setIsInputValid(false);
    }
    setIsLoadingRemove(false);
  }

  const clear = async () => {
    setIsLoading(true);
    queue.clear();
    update({});
    await sleep(LOND_DELAY);
    setIsLoading(false);
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    setIsInputValid(event.currentTarget.value.length <= MAX_INPUT_LENGTH && event.currentTarget.value.length >= MIN_INPUT_LENGTH);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input_box}>
        <Input disabled={isLoadingAdd || isLoadingRemove || isLoading} value={input} name="input" id="input" placeholder="Введите текст" maxLength={4} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button disabled={!isInputValid || isLoadingRemove || isLoading}
          isLoader={isLoadingAdd} name="add_button" text="Добавить" onClick={add} extraClass={styles.button}></Button>
        <Button disabled={(queue.tail === 0 && queue.head === 0) || isLoading || isLoadingAdd}
          isLoader={isLoadingRemove} name="remove_button1" text="Удалить" onClick={remove} extraClass={styles.button}></Button>
        <Button disabled={isLoadingRemove || isLoadingAdd}
          isLoader={isLoading} name="clear_button" text="Очистить" onClick={clear} extraClass={styles.button}></Button>
      </form>
      <div className={styles.circle_box}>
        {queue.elements.map((e, i) => <Circle letter={e?.circle} key={i} state={e?.state} head={e?.head} index={i} tail={e?.tail}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
