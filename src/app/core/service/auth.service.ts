import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Profile} from "../models/profile";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 url = environment.keyloakUrl;
  constructor(private http:HttpClient) { }
  getCurrentUser():Observable<Profile>{
    return this.http.get<Profile>(`${this.url}/userinfo`).pipe(
      res=>{
        this.currentUser=res;
        return res;
      }
    );
  }
  currentUser:any;
}
