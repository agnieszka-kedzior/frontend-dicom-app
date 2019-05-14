import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AppAuthService {


  constructor(private http: HttpClient, private router: Router) {

  }

  login(login: string, password: string) {
    return this.http.post('http://192.168.8.108:43210/oauth/token?grant_type=password&username=' + login + '&password=' + password, null
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
    return this.http.post('http://192.168.8.108:43210/private/image/upload?access_token=' + localStorage.getItem('token')
      , fd, {reportProgress: true, observe: 'events', headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0'})});
  }

  download() {
    return this.http.get('http://192.168.8.108:43210/private/image/1?access_token=' + localStorage.getItem('token'),
      {headers: new HttpHeaders({'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Accept' : 'image/jpeg'}), responseType: 'blob'}
    );
  }
}
