import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AppShareService {

  CurrentImageId: number;
  CurrentNumberOfFrames: number;

  constructor(private router: Router) {
  }

  setCurrentImageId(id: number) {
    this.CurrentImageId = id;
  }

  getCurrentImageId() {
    return this.CurrentImageId;
  }

  setCurrentNumberOfFrames(number: number) {
    this.CurrentNumberOfFrames = number;
  }

  getCurrentNumberOfFrames() {
    return this.CurrentNumberOfFrames;
  }
}
