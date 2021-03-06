import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private readonly loginPath = 'http://127.0.0.1:8000/login/';

  constructor(private http: HttpClient) {
  }

  login(name: string, password: string, callback) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    var _this = this;

    var observer = {
      next(value) {
        console.log(value);
        if (value !== "Invalid login") {
          console.log(JSON.parse(value))
          value = JSON.parse(value)
          let token = value["token"]
          let owner = value["owner"]
          localStorage.setItem('currentUser', JSON.stringify({ 
                                    username: name,
                                    token: token,
                                    owner: owner
                                  }));
          callback.handleLogin(true);
        }
      },
        error(msg) {
          callback.handleLogin(false);
        }
    }

    this.http.post(this.loginPath, JSON.stringify({ 
      username : name, 
      password : password })
    , { headers , responseType : 'text' as 'json'})
          // pipe hvata los zahtev i baca error koji subscribe obradjuje
          .pipe(catchError(err => {
          return throwError(err);
          }))
          .subscribe(observer);
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (this.getToken() != '') return true;
    else return false;
  }

  getCurrentUser() {
    if (localStorage.currentUser) {
      return JSON.parse(localStorage.currentUser);
    }
    else {
      return undefined;
    }
  }

}
