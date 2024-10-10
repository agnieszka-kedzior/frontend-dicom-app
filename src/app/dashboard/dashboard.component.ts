import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthService} from '../app-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listOfImages: any;

  constructor(private router: Router, private appAuthService: AppAuthService) {
  }

  ngOnInit() {
    this.getUserImages();
  }

  getUserImages() {
    this.appAuthService.userImages().subscribe(data => {
        this.listOfImages = data;
      },
      error => console.log(error));
  }

}
