import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Option} from "../models/option";
import {Observable} from "rxjs";

const skillUrl = environment.skillUrl

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private baseUrl = `${skillUrl}/option`

  constructor(private http: HttpClient) {
  }

  addOptionToQuestion(option: Option, questionId: number): Observable<Option> {
    return this.http.post<Option>(`${this.baseUrl}/${questionId}`, option);
  }

  updateOptionById(option: Option, id: number): Observable<Option> {
    return this.http.put<Option>(`${this.baseUrl}/${id}`, option)
  }

  deleteOptionById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
