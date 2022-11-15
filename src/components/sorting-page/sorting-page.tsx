
import React, { useState } from "react";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep, swap } from "../../utils/functions";
import { SortKind, TCircle } from "../../utils/types";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  const [, update] = useState({});
  const [collection, setCollection] = useState<Array<TCircle>>([]);
  const [sortingKind, setSortingKind] = useState<SortKind>(SortKind.Selection);
  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDesc, setIsLoadingDesc] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const generateArray = (range: number): Array<TCircle> => {
    return Array.from({ length: Math.floor(Math.random() * 14) + 3 }, () => Math.floor(Math.random() * range)).map<TCircle>((e, i) => { return { id: i, circle: e.toString(), state: ElementStates.Default } as TCircle; });
  }
  const selectionSort = async (arr: TCircle[], deriction: Direction) => {
    const { length } = arr;
    arr.forEach(t => t.state = ElementStates.Default);
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      for (let j = i; j < length; j++) {
        if (deriction === Direction.Ascending) {
          if (Number.parseInt(arr[maxInd].circle) > Number.parseInt(arr[j].circle)) {
            arr[maxInd].state = ElementStates.Default;
            maxInd = j;
            arr[j].state = ElementStates.Changing;
            arr[i].state = ElementStates.Changing;
            await sleep(500);
            update({});
          }
        }
        else {
          if (Number.parseInt(arr[maxInd].circle) < Number.parseInt(arr[j].circle)) {
            arr[maxInd].state = ElementStates.Default;
            maxInd = j;
            arr[j].state = ElementStates.Changing;
            await sleep(500);
            update({});
          }
        }
      }
      if (i !== maxInd) {
        swap(arr, i, maxInd);
      }
      arr[deriction === Direction.Ascending ? length - i - 1 : i].state = ElementStates.Modified;
      await sleep(500);
      update({});
    }

  };

  const bubbleSort = async (arr: TCircle[], deriction: Direction) => {
    const { length } = arr;
    arr.forEach(t => t.state = ElementStates.Default);
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (deriction === Direction.Ascending) {
          if (Number.parseInt(arr[j].circle) > Number.parseInt(arr[j + 1].circle)) {
            arr[j + 1].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            await sleep(500);
            update({});
            swap(arr, j, j + 1)
            arr[j].state = ElementStates.Default;
          }
        }
        else {
          if (Number.parseInt(arr[j].circle) < Number.parseInt(arr[j + 1].circle)) {
            arr[j + 1].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            await sleep(500);
            update({});
            swap(arr, j, j + 1)
            arr[j].state = ElementStates.Default;
          }
        }
      }
      arr[length - i - 1].state = ElementStates.Modified;
      await sleep(500);
      update({});

    }

  };

  const asc = () => {
    setIsLoadingAsc(true);
    render(Direction.Ascending);
    setIsLoadingAsc(false);
  }
  const desc = () => {
    setIsLoadingDesc(true);
    render(Direction.Descending);
    setIsLoadingDesc(false);
  }
  const regenerate = async () => {
    setIsLoading(true);
    await sleep(500);
    setCollection(generateArray(100));
    setIsLoading(false);
  }
  const changeSortKind = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSortingKind(Number.parseInt(event.target.value) === 0 ? SortKind.Bubble : SortKind.Selection);
  };
  const render = (direction: Direction) => {
    if (sortingKind === SortKind.Bubble) {
      bubbleSort(collection, direction);
    } else {
      selectionSort(collection, direction);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">

      <form className={styles.input_box}  >
        <RadioInput name="radio_select" label="Выбор" onChange={changeSortKind} extraClass={styles.radio} value={SortKind.Selection} checked={sortingKind === SortKind.Selection}></RadioInput>
        <RadioInput name="radio_select" label="Пузырёк" onChange={changeSortKind} extraClass={styles.radio} value={SortKind.Bubble} checked={sortingKind === SortKind.Bubble}></RadioInput>
        <Button isLoader={isLoadingAsc} name="asc_button" sorting={Direction.Ascending} text="По возрастанию" onClick={asc} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingDesc} name="desc_button1" sorting={Direction.Descending} text="По убыванию" onClick={desc} extraClass={styles.button}></Button>
        <Button isLoader={isLoading} name="reload_button" text="Развернуть" onClick={regenerate} extraClass={styles.button}></Button>
      </form>

      <div className={styles.circle_box}>
        {collection?.map((e) => <Column index={Number.parseInt(e.circle)} key={e.id} state={e.state}></Column>)}
      </div>
    </SolutionLayout>

  );
};
