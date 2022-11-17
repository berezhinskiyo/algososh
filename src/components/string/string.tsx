import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../utils/types";
import { sleep, swap } from "../../utils/functions";
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { LONG_DELAY } from "../../utils/constants";


export const StringComponent: React.FC = () => {

  const [collection, setCollection] = useState<Array<TCircle>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [, update] = useState({});
  const [input, setInput] = useState('');

  const sort = async (arr: TCircle[]) => {
    const { length } = arr;
    if (length === 1) {
      arr[0].state = ElementStates.Modified;
      update({});
      await sleep(LONG_DELAY);
      return;
    }
    for (let i = 0; i < length / 2; i++) {
      arr[length - 1 - i].state = ElementStates.Changing;
      arr[i].state = ElementStates.Changing;
      update({});
      await sleep(LONG_DELAY);
      swap(arr, i, length - 1 - i);
      arr[length - 1 - i].state = ElementStates.Modified;
      arr[i].state = ElementStates.Modified;
      update({});
      await sleep(LONG_DELAY);
    }

  }

  const expand = async () => {

    setIsLoader(true);

    const symbols = input.split('').map((e, i) => { return { id: i, circle: e, state: ElementStates.Default } as TCircle; });
    setCollection(symbols);

    update({});
    await sleep(1000)
    if (symbols.length > 0) {
      await sort(symbols);
    }


    setIsLoader(false);
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {

    setInput(event.currentTarget.value);
    if (event.currentTarget.value.length > 11 || event.currentTarget.value.length <= 0) setIsDisabled(true);
    else setIsDisabled(false);

  }


  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_box}  >
        <Input disabled={isLoader} name="input" id="input" value={input} placeholder="Введите текст" maxLength={11} extraClass={styles.input} isLimitText={true} onChange={handleOnChange}></Input>
        <Button isLoader={isLoader} name="button" text="Развернуть" disabled={isDisabled} onClick={expand}></Button>
      </form>

      <div className={styles.circle_box}>
        {collection?.map((e) => <Circle letter={e.circle} key={e.id} state={e.state}></Circle>)}
      </div>
    </SolutionLayout>
  );
};
