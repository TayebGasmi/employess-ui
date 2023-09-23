import { Injectable } from '@angular/core';
import {BaseService} from "./BaseService";
import {environment} from "../../../environments/environment";
import {Activity} from "../models/Activity";
import {HttpClient} from "@angular/common/http";
const skillUrl = environment.skillUrl

@Injectable({
  providedIn: 'root'
})

export class ActivityService extends BaseService<Activity, number> {

  constructor(private http:HttpClient )
   {
    const baseUrl = `${skillUrl}/activity`
    super(http,baseUrl);
  }
}
