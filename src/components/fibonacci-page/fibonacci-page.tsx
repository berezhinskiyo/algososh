import React, { createRef, FormEvent, FormEventHandler, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { ElementStates } from "../../types/element-states"
import { IFormElement, TCircle } from "../../utils/types";
import { sleep } from "../../utils/functions";
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';

export const FibonacciPage: React.FC = () => {
  const [collection, setCollection] = useState<Array<TCircle>>();
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n == 0) {
      memo[0] = 1;
      return memo[n];
    }
    if (n == 1) {
      memo[1] = 1;
      memo[0] = 1;
      return memo[n];
    }

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };

  const expand = async (event: FormEvent<IFormElement>) => {
    event.preventDefault();
    setIsLoader(true);
    try {

      const num: number = Number.parseInt(event.currentTarget.elements.input.value);

      const memo: Record<number, number> = {};
      fib(num, memo);
      const symbols: Array<TCircle> = [];
      for (let i in Object.keys(memo)) {
        symbols.push({ id: Number.parseInt(i), circle: Object.values(memo)[i].toString(), state: ElementStates.Default })
        await sleep(500);
        setCollection(symbols.slice());
      }
    } finally {
      setIsLoader(false);
    }
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input_box} onSubmit={expand} >
        <Input name="input" id="input" placeholder="Введите текст" max={19} extraClass={styles.input} type='number' isLimitText={true}></Input>
        <Button isLoader={isLoader} name="button" text="Развернуть" type="submit"></Button>
      </form>
      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state} tail={e.id.toString()} extraClass={styles.circle}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
