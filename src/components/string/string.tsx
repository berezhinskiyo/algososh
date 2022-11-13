import React, { ChangeEvent, createRef, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { IFormElement, TCircle } from "../../utils/types";
import { sleep, swap } from "../../utils/functions";
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';



export const StringComponent: React.FC = () => {

  const [collection, setCollection] = useState<Array<TCircle>>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);



  async function selectionSort<T>(arr: T[], callback?: (arr: TCircle[], i: number, maxInd: number) => void) {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < length; j++) {
        if (!callback && arr[maxInd] < arr[j]) {
          maxInd = j;
        }
        if (callback && (arr[maxInd] as unknown as TCircle).circle > (arr[j] as unknown as TCircle).circle) {
          maxInd = j;
        }
      }
      if (i !== maxInd) {
        if (!callback) swap<string>(arr as unknown as string[], i, maxInd);
        if (callback) await callback(arr as unknown as TCircle[], i, maxInd);
      }

    }
  };
  async function callback(arr: TCircle[], i: number, maxInd: number) {
    if (i !== maxInd) {
      swap<TCircle>(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;
      arr[maxInd].state = ElementStates.Modified
      setCollection(arr.slice());
      await sleep(1000)
    }
  }

  const expand = async (event: FormEvent<IFormElement>) => {
    event.preventDefault();
    setIsLoader(true);
    try {

      const original = event.currentTarget.elements.input.value.split('');
      const sorted = original.slice();
      selectionSort<string>(sorted);

      const symbols = original.map((e, i) => { return { id: i, circle: e, state: ElementStates.Default } as TCircle; });
      setCollection(symbols);

      for (let i = 0; i < symbols.length; i++) {
        if (original[i] !== sorted[i]) {
          symbols[i].state = ElementStates.Changing;
          await sleep(1000);
          setCollection(symbols.slice());
        }
      }

      await sleep(1000);
      await selectionSort(symbols, callback);


    } finally {
      setIsLoader(false);
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (Number.parseInt(event.target.value) > 19 || Number.parseInt(event.target.value) <= 0) setIsDisabled(true);
    else setIsDisabled(false);

  }
  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_box} onSubmit={expand} >
        <Input name="input" id="input" placeholder="Введите текст" maxLength={11} extraClass={styles.input} isLimitText={true} onChange={ onChange}></Input>
        <Button isLoader={isLoader} name="button" text="Развернуть" type="submit" disabled={isDisabled} ></Button>
      </form>

      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
