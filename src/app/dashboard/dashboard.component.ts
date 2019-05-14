import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthService} from '../app-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;
  constructor(private router: Router, private appAuthService:  AppAuthService) { }

  ngOnInit() {
  }

  viewImage() {
    this.appAuthService.download().subscribe( data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(img: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);
    if (img) {
      reader.readAsDataURL(img);
    }
  }
}
