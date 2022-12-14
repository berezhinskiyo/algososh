
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
import { SHORT_DELAY } from "../../utils/constants";
import { ARRAY_LENGTH, RANDOM_START, RANDOM_RANGE, bubbleSort, selectionSort } from './utils'

export const SortingPage: React.FC = () => {

  const [, update] = useState({});
  const [collection, setCollection] = useState<Array<TCircle>>([]);
  const [sortingKind, setSortingKind] = useState<SortKind>(SortKind.Selection);
  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDesc, setIsLoadingDesc] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const generateArray = (range: number): Array<TCircle> => {
    return Array.from({ length: Math.floor(Math.random() * RANDOM_RANGE) + RANDOM_START }, () =>
      Math.floor(Math.random() * range))
      .map<TCircle>((e, i) => { return { id: i, circle: e.toString(), state: ElementStates.Default } as TCircle; });
  }


  const asc = async () => {
    setIsLoadingAsc(true);
    await render(Direction.Ascending);
    setIsLoadingAsc(false);
  }
  const desc = async () => {
    setIsLoadingDesc(true);
    await render(Direction.Descending);
    setIsLoadingDesc(false);
  }
  const regenerate = async () => {
    setIsLoading(true);
    await sleep(SHORT_DELAY);
    setCollection(generateArray(ARRAY_LENGTH));
    setIsLoading(false);
  }
  const changeSortKind = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingKind(Number.parseInt(event.target.value) === 0 ? SortKind.Bubble : SortKind.Selection);
  };
  const render = async (direction: Direction) => {
    if (sortingKind === SortKind.Bubble) {
      await bubbleSort(collection, direction, update);
    } else {
      await selectionSort(collection, direction, update);
    }
  }

  return (
    <SolutionLayout title="???????????????????? ??????????????">

      <form className={styles.input_box}  >
        <RadioInput disabled={isLoadingAsc || isLoadingDesc || isLoading} name="radio_select" label="??????????" onChange={changeSortKind} extraClass={styles.radio} value={SortKind.Selection} checked={sortingKind === SortKind.Selection}></RadioInput>
        <RadioInput disabled={isLoadingAsc || isLoadingDesc || isLoading} name="radio_select" label="??????????????" onChange={changeSortKind} extraClass={styles.radio} value={SortKind.Bubble} checked={sortingKind === SortKind.Bubble}></RadioInput>
        <Button isLoader={isLoadingAsc} disabled={isLoadingDesc || isLoading || (collection.length === 0)} name="asc_button" sorting={Direction.Ascending} text="???? ??????????????????????" onClick={asc} extraClass={styles.button}></Button>
        <Button isLoader={isLoadingDesc} disabled={isLoading || isLoadingAsc || (collection.length === 0)} name="desc_button1" sorting={Direction.Descending} text="???? ????????????????" onClick={desc} extraClass={styles.button}></Button>
        <Button isLoader={isLoading} disabled={isLoadingAsc || isLoadingDesc} name="reload_button" text="????????????????????" onClick={regenerate} extraClass={styles.button}></Button>
      </form>

      <div className={styles.circle_box}>
        {collection?.map((e) => <Column index={Number.parseInt(e.circle)} key={e.id} state={e.state}></Column>)}
      </div>
    </SolutionLayout>

  );
};
