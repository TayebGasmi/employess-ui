import { Injectable } from '@angular/core';
import {BaseService} from "./BaseService";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Domain} from "../models/Domain";


const skillUrl = environment.skillUrl
@Injectable({
  providedIn: 'root'
})
export class DomainService extends BaseService<Domain, number>{

  constructor(private http:HttpClient ) {
    const baseUrl = `${skillUrl}/domain`
    super(http,baseUrl);
  }
}
