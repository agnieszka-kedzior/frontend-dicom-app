import {Component, OnInit} from '@angular/core';
import {AppShareService} from '../app-share.service';
import {AppAuthService} from '../app-auth.service';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.css']
})
export class FramesComponent implements OnInit {

  imageId: number;
  imageFramesNumber: number;
  imageDetails: object;
  imageToShow: any;
  currentFrame: number;
  interval: any;

  constructor(private appShareService: AppShareService, private appAuthService: AppAuthService) {
  }

  ngOnInit() {
    this.setImageInfo();
    this.getImageDetails();
    this.currentFrame = 1;
    this.downloadCurrentFrame();
  }

  setImageInfo() {
    this.imageId = this.appShareService.getCurrentImageId();
    this.imageFramesNumber = this.appShareService.getCurrentNumberOfFrames();
  }
  getImageDetails() {
    this.appAuthService.imageDetails(this.imageId).subscribe(data => {
        this.imageDetails = data;
      },
      error => console.log(error));
  }

  downloadCurrentFrame() {
    this.appAuthService.imageNumberFrameDownload(this.imageId, this.currentFrame).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
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
  runInterval() {
    this.interval = setInterval( () => {
      if ( this.imageFramesNumber > 0 && this.imageFramesNumber > this.currentFrame) {
        this.currentFrame = this.currentFrame + 1 ;
      } else if (this.currentFrame === this.imageFramesNumber) {
        this.currentFrame = 1;
      }
      this.downloadCurrentFrame();
    }, 1000);
  }
}
