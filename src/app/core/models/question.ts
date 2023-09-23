import {Option} from "./option";

export interface Question {
  id?: number;
  questionText: string;
  responseDescription: string;
  options: Option[];
}
