import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Task} from '../models/Task';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly API_URL = environment.taskUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllUndeletedTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_URL + "/undeleted")
  }

  deleteTask(id: string): Observable<Task> {

    return this.httpClient.put<Task>(this.API_URL + "/delete/" + id, "");
  }

  duplicateTask(id: string): Observable<Task> {
    return this.httpClient.post<Task>(this.API_URL + "/duplicate/" + id, "");
  }

  saveTask(task: Task) {
    return this.httpClient.post<Task>(`${this.API_URL}`, task);
  }

  updateTask(task: Task, taskId: any) {
    return this.httpClient.put<Task>(`${this.API_URL}/${taskId}`, task);
  }

  selectTasksPerSprint(sprintId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.API_URL}/tasks-per-sprints/${sprintId}`)
  }
}
