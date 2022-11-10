import React, { createRef, FormEvent, FormEventHandler } from "react";
import { useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states"
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';


interface IFormElements extends HTMLFormControlsCollection {
  input: HTMLInputElement
}

interface IFormElement extends HTMLFormElement {
  readonly elements: IFormElements
}
type TCircle = {
  id: number;
  circle: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const sleep = async (milliseconds: number) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds)
    });
  };
  const [collection, setCollection] = useState<Array<TCircle>>();
  const [isLoader, setIsLoader] = useState<boolean>(false);

  function swap<T>(arr: Array<T>, firstIndex: number, secondIndex: number): void {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = (arr: string[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < length; j++) {
        if (arr[i] > arr[j]) maxInd = j;
      }
      if (i !== maxInd) swap<string>(arr, i, maxInd);
    }

  };
  const selectionSortTCircle = async (arr: TCircle[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < length; j++) {
        if (arr[i].circle > arr[j].circle) maxInd = j;
      }
      if (i !== maxInd) {
        swap<TCircle>(arr, i, maxInd);
        arr[i].state = ElementStates.Modified;
        arr[maxInd].state = ElementStates.Modified
        setCollection(arr.slice());
        await sleep(2000);
      }
    }

  };
  const expand = async (event: FormEvent<IFormElement>) => {
    event.preventDefault();
    setIsLoader(true);
    try {

      const original = event.currentTarget.elements.input.value.split('');
      const sorted = original.slice();
      selectionSort(sorted);

      const symbols = original.map((e, i) => { return { id: i, circle: e, state: ElementStates.Default } as TCircle; });
      setCollection(symbols);
      await sleep(2000);

      for (let i = 0; i < symbols.length; i++) {
        if (original[i] !== sorted[i]) symbols[i].state = ElementStates.Changing;
      }
      setCollection(symbols.slice());
      await sleep(2000);
      selectionSortTCircle(symbols);


    } finally {
      setIsLoader(false);
    }
  }
  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_box} onSubmit={expand} >
        <Input name="input" id="input" placeholder="Введите текст" maxLength={11} extraClass={styles.input}></Input>
        <Button isLoader={isLoader} name="button" text="Развернуть" type="submit"></Button>
      </form>
      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
