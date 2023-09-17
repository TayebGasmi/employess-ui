import {TaskStatus} from "./task-status.enum";
import {TaskType} from "./task-type.enum";

export class Task {
    id!: string;
    taskType!: TaskType;
    taskDescription!: string;
    taskTime!: number;
    taskTitle!: string;
    taskEstimation!: number;
    taskStatus!: TaskStatus;

}
