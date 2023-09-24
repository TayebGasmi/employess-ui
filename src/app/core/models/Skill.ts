import {Domain} from "./Domain";
import {Activity} from "./Activity";

export interface Skill {
  id: number,
  name: string;
  description?: string;
  userId?: number;
  domain?:Domain;
  activity?:Activity;
}
