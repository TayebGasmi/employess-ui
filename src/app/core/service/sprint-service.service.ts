import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Sprint} from '../models/Sprint';

@Injectable({
    providedIn: 'root'
})
export class SprintServiceService {
    readonly API_URL = environment.sprintUrl;

    constructor(private httpClient: HttpClient) {
    }

    getAllUndeletedSprints(): Observable<Sprint[]> {
        return this.httpClient.get<Sprint[]>(`${this.API_URL}/all-undeleted`);
    }

    saveSprint(sprint: Sprint):Observable<Sprint> {
        return this.httpClient.post<Sprint>(`${this.API_URL}`, sprint);
    }

    deleteSprint(sprintId: string) {
        return this.httpClient.put<Sprint>(`${this.API_URL}/delete/${sprintId}`, '').subscribe();
    }

}
