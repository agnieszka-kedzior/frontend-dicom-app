import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AppAuthService} from '../app-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private appAuthService:  AppAuthService) {
  }

  ngOnInit() {
  }

  login(form: NgForm): void {
    this.appAuthService.login(form.value.username, form.value.password);
  }

}
