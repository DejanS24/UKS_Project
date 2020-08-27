import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  private readonly repoApiEndpoint = 'http://127.0.0.1:8000/projects/';

  getRepos(username) {

    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    return this.http.get(this.repoApiEndpoint + username, {responseType : 'json'}).toPromise();
  }


}
