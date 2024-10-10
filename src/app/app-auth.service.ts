import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AppAuthService {
  url: any;

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://192.168.43.185:43210';
  }

  login(login: string, password: string) {
    return this.http.post( this.url + '/oauth/token?grant_type=password&username=' + login + '&password=' + password, null
      , {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0'})})
      .subscribe(response => {
          const token = response['access_token'];
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('username'));
          this.router.navigate(['/dashboard']);
          },
        error => console.log(error)
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  upload(fd: FormData) {
    return this.http.post(this.url + '/private/image/upload?access_token=' + localStorage.getItem('token')
      , fd, {reportProgress: true, observe: 'events', headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0'})});
  }

  download(id: number) {
    return this.http.get(this.url + '/private/image/' + id + '?access_token=' + localStorage.getItem('token'),
      {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Accept' : 'image/jpeg'}), responseType: 'blob'}
    );
  }

  userImages() {
    return this.http.get(this.url + '/private/image/user?access_token=' + localStorage.getItem('token'),
        {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0'})}
    );
  }
  imageDetails(id: number) {
    return this.http.get(this.url + '/private/image/by/' + id + '?access_token=' + localStorage.getItem('token'),
      {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0'})}
    );
  }
  imageFirstFrameDownload(id: number) {
    return this.http.get(this.url + '/private/f/id/' + id + '?access_token=' + localStorage.getItem('token'),
      {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Accept' : 'image/jpeg'}), responseType: 'blob'}
    );
  }
  imageNumberFrameDownload(id: number, number: number) {
    return this.http.get(this.url + '/private/f/f/' + id + '/' + number + '?access_token=' + localStorage.getItem('token'),
      {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Accept' : 'image/jpeg'}), responseType: 'blob'}
    );
  }
}
