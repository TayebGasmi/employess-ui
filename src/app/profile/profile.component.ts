import { Component } from '@angular/core';
import {AuthService} from "../core/service/auth.service";
import {Observable} from "rxjs";
import {Profile} from "../core/models/profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private authService: AuthService) {
  }
  userProfile$:Observable<Profile>=this.authService.getCurrentUser()
}
