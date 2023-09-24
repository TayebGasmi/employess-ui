import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Sprint} from '../models/Sprint';
import {BaseService} from "./BaseService";
import {Task} from "../models/Task";
const API_URL = environment.sprintUrl;
@Injectable({
    providedIn: 'root'
})
export class SprintServiceService  extends BaseService<Sprint, string>{


  constructor(private http:HttpClient ) {
    const baseUrl = `${environment.sprintUrl}`
    super(http,baseUrl);
  }

    getAllUndeletedSprints(): Observable<Sprint[]> {
        return this.http.get<Sprint[]>(`${API_URL}/all-undeleted`);
    }

    saveSprint(sprint: Sprint):Observable<Sprint> {
        return this.http.post<Sprint>(`${API_URL}`, sprint);
    }

    deleteSprint(sprintId: string) {
        return this.http.put<Sprint>(`${API_URL}/delete/${sprintId}`, '').subscribe();
    }
    ///update/{sprintId}
    updateSprint(sprint:Sprint,sprintId:any):Observable<Sprint>{
      return this.http.put<Sprint>(`${API_URL}/update/${sprintId}`,sprint)
    }

}
