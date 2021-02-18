import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }
  private readonly issueApiEndpoint = 'http://127.0.0.1:8000/register/';

  async registerUser(username, password, email, github) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log(username);
    console.log(password);

    return this.http.post(this.issueApiEndpoint, JSON.stringify({
      username: username,
      password: password,
      git_username: github,
      email: email
    })
    , { headers, responseType: 'text' as 'json'}).toPromise();
  }
}
