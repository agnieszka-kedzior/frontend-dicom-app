import { Component, OnInit } from '@angular/core';
import {AppAuthService} from '../app-auth.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFile: File = null;
  progress: String = '0%';
  visible: String = 'hidden';

  constructor(private appAuthService:  AppAuthService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.progress = '0%';
    this.visible = 'hidden';
  }

  upload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.appAuthService.upload(fd).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          this.progress = Math.round(event.loaded / event.total * 100) + '%';
        } else if (event.type === HttpEventType.Response) {
          if (event.ok) {
            this.visible = 'visible';
          }
        }
      }, error => console.log(error)
    );
  }
}
