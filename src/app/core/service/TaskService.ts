import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Task} from '../models/Task';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from "./BaseService";
import {TaskStatus} from "../models/task-status.enum";

const API_URL = environment.taskUrl;

@Injectable({
    providedIn: 'root'
})

export class TaskService extends BaseService<Task, string> {

  constructor(private http:HttpClient ) {
    const baseUrl = `${environment.taskUrl}`
    super(http,baseUrl);
  }
    getAllUndeletedTasks(): Observable<Task[]> {
        return this.http.get<Task[]>( API_URL+ "/undeleted")
    }

    deleteTask(id: string):Observable<Task> {

        return  this.http.put<Task>(API_URL + "/delete/" + id, "");
    }

    duplicateTask(id: string):Observable<Task> {
   return  this.http.post<Task>(API_URL + "/duplicate/" + id, "");
    }

    saveTask(task: Task) {
        return this.http.post<Task>(`${API_URL}`, task);
    }

    updateTask(task: Task, taskId : any):Observable<Task> {
        return this.http.put<Task>(`${API_URL}/${taskId}`, task);
    }

    selectTasksPerSprint(sprintId: string): Observable<Task[]> {
        return this.http.get<Task[]>(`${API_URL}/tasks-per-sprints/${sprintId}`)
    }
// /affect-task/{taskId}/{sprintId}
    affectTaskToSprint( taskId:string, sprintId:string):Observable<Task>{
    return this.http.put<Task>(API_URL + "/affect-task/" + taskId +`/`+sprintId, "");
}
//"/update-status/{taskId}"
  updateTaskStatus(taskId:string,taskStatus:TaskStatus):Observable<Task>{
   let  param:HttpParams = new HttpParams()
      .set('TaskStatus',taskStatus.toString())
    return this.http.put<Task>(API_URL+"/update-status/"+taskId,{param});
  }
}
