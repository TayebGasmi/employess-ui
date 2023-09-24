import { Injectable } from '@angular/core';
import {BaseService} from "./BaseService";
import {Job} from "../models/job";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Page} from "../models/Page";
import {Skill} from "../models/Skill";
@Injectable({
  providedIn: 'root'
})
export class JobService extends BaseService<Job, number> {

  constructor(private http: HttpClient) {
    const baseUrl = `${environment.skillUrl}/job`
    super(http, baseUrl);
  }
  searchSkills(name: string, page: number, size: number): Observable<Page<Skill>> {
    return this.http.get<Page<Skill>>(`${environment.skillUrl}/job/search`, {
      params: {
        name: name,
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
