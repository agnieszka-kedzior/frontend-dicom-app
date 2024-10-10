import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthService} from '../app-auth.service';
import {AppShareService} from '../app-share.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  imageToShow: any;
  @Input() imageInfo: object;
  constructor(private appAuthService:  AppAuthService, private router: Router, private appShareService: AppShareService) { }

  ngOnInit() {
    this.getImageFirstFrame(this.imageInfo['imageId']);
  }

  getImageFirstFrame(id: number) {
    this.appAuthService.imageFirstFrameDownload(id).subscribe( data => {
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

  setImageInfo() {
    this.appShareService.setCurrentImageId(this.imageInfo['imageId']);
    this.appShareService.setCurrentNumberOfFrames(this.imageInfo['imageNumberOfFrames']);
  }

}
