import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.keycloakAdminUrl+"users";

  constructor(private http:HttpClient) { }
  add(user:any){
    return this.http.post(this.API_URL,user);
  }
  getAll (first:number=0,max:number=10,search:string="") : Observable<User[]>{
    return this.http.get<User[]>(this.API_URL+"?first="+first+"&max="+max+"&search="+search);
  }
  delete(id:string){
    return this.http.delete(this.API_URL+"/"+id);
  }
  update(id:string,user:any){
    return this.http.put(this.API_URL+"/"+id,user);
  }
  get(id:string){
    return this.http.get(this.API_URL+"/"+id);
  }
  resetPassword(id:string){
    return this.http.put(this.API_URL+"/"+id+"/reset-password",null);
  }
  getAttributes(id:string){
    return this.http.get(this.API_URL+"/"+id+"/attributes");
  }
  dataSubject$:BehaviorSubject<User|null>=new BehaviorSubject<User|null>(null);
  updateData(user:User|null=null){
    this.dataSubject$.next(user);
  }
  data$=this.dataSubject$.asObservable();

}
