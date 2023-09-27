import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment"
import {BehaviorSubject, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  private baseUrl = `${environment.skillUrl}/skill-user`

  constructor(private http:HttpClient) { }
  addSkillToUser(skillId:number,skillLevel:string):Observable<void>{
    return this.http.post<void>(this.baseUrl,{skillLevel,
    skillId:skillId,
    })
  }
  getSkillByUser():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/user")
  }
  deleteSkillFromUser(Id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+Id)
  }
  getAll():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/all") ;
  }
  dataSubject$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  data$: Observable<any | null> = this.dataSubject$.asObservable();
  updateData(t: any | null = null): void {
    this.dataSubject$.next(t);
  }
}
