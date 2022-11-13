import {ElementStates} from '../types/element-states';
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
}