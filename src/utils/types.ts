import { ReactElement } from 'react';
import { ElementStates } from '../types/element-states';
export interface IFormElements extends HTMLFormControlsCollection {
  input: HTMLInputElement
}

export interface IFormElement extends HTMLFormElement {
  readonly elements: IFormElements
}
export type TCircle = {
  id: number;
  circle: string;
  state: ElementStates;
  head?: string | ReactElement;
  tail?: string | ReactElement;
}
export enum SortKind {
  Bubble = 0,
  Selection = 1
}