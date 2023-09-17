import {Timestamp} from "rxjs";
import {SprintStatus} from "./sprint-status.enum";

export class Sprint {
    id!: string;
    sprintTitle!: string;
    sprintDescription!: string;
    startDate!: Timestamp<string>;
    endDate!: Timestamp<string>;
    sprintStatus!: SprintStatus;
}
