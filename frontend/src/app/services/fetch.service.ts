import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  private readonly repoApiEndpoint = 'http://127.0.0.1:8000/projects/';

  private readonly issueApiEndpoint = 'http://127.0.0.1:8000/issues/';

  private readonly eventApiEndpoint = 'http://127.0.0.1:8000/repos/DejanS24/UKS_Project/issues/3/events';

  getRepos(username) {

    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    return this.http.get(this.repoApiEndpoint + username + '/', {responseType : 'json'}).toPromise();
  }

  getIssues( fullName) {
    console.log(fullName);
    return this.http.get(this.issueApiEndpoint + fullName + '/', {responseType: 'json'}).toPromise();
  }

  getEvents( fullName) {
    console.log(fullName);
    return this.http.get(this.eventApiEndpoint + '/', {responseType: 'json'}).toPromise();
  }


}
