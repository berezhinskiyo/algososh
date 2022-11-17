import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { ElementStates } from "../../types/element-states"
import { TCircle } from "../../utils/types";
import { sleep } from "../../utils/functions";
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { MAX_FIBONACCI_NUMBER, MIN_FIBONACCI_NUMBER, getFibonacciNumbers } from "./utils";
import { SHORT_DELAY } from "../../utils/constants";

export const FibonacciPage: React.FC = () => {
  const [collection, setCollection] = useState<Array<TCircle>>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [input, setInput] = useState('');


  const expand = async () => {
    setIsLoader(true);
    try {

      const num: number = Number.parseInt(input);
      const memo: Array<number> = getFibonacciNumbers(num + 1);
      const symbols: Array<TCircle> = [];
      for (let i = 0; i < memo.length; i++) {
        symbols.push({ id: i, circle: memo[i].toString(), state: ElementStates.Default })
        await sleep(SHORT_DELAY);
        setCollection(symbols.slice());
      }
    } finally {
      setIsLoader(false);
    }
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {

    setInput(event.currentTarget.value);
    if (Number.parseInt(event.currentTarget.value) < MIN_FIBONACCI_NUMBER || Number.parseInt(event.currentTarget.value) > MAX_FIBONACCI_NUMBER) {

      setIsDisabled(true);
    }
    else setIsDisabled(false);

  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input_box} >
        <Input name="input" id="input" value={input} placeholder="Введите текст" max={MAX_FIBONACCI_NUMBER} extraClass={styles.input} type='number' isLimitText={true} onChange={handleOnChange}></Input>
        <Button isLoader={isLoader} name="button" text="Развернуть" disabled={isDisabled} onClick={expand}></Button>
      </form>
      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state} tail={e.id.toString()} extraClass={styles.circle}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
