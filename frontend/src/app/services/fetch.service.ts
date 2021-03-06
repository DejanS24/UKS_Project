import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  private readonly repoApiEndpoint = 'http://127.0.0.1:8000/projects/';

  private readonly issueApiEndpoint = 'http://127.0.0.1:8000/issues/';

  private readonly labelApiEndpoint = 'http://127.0.0.1:8000/labels/';

  private readonly miletoneApiEndpoint = 'http://127.0.0.1:8000/milestones/';

  private readonly eventApiEndpoint = 'http://127.0.0.1:8000/repos/DejanS24/UKS_Project/issues/3/events';

  getRepos(username) {

    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    return this.http.get(this.repoApiEndpoint + username + '/', {responseType : 'json'}).toPromise();
  }

  getLabels(){
    return this.http.get(this.labelApiEndpoint+'all', {responseType : 'text' as 'json'});
  }

  getIssues( fullName) {
    console.log(fullName);
    return this.http.get(this.issueApiEndpoint + fullName + '/', {responseType: 'json'}).toPromise();
  }

  createLabel(label){
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.labelApiEndpoint+'create', JSON.stringify({
      name: label.name,
      color: label.color
    })
    , { headers, responseType: 'text' as 'json'}).toPromise();
  }

  createIssue(issue){
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    // this.issue.project_id, this.issue.state,this.issue.label_id
    // return this.http.post(this.issueApiEndpoint, {}).toPromise();
    return this.http.post(this.issueApiEndpoint+'create', JSON.stringify({ 
      title : issue.title,
      project_name: issue.project_name,
      state: issue.state,
      label_id: issue.label_id
    })
      , { headers , responseType : 'text' as 'json'}).toPromise();
  }

  createMilestone(milestone){
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.miletoneApiEndpoint+'create', JSON.stringify({
      name: milestone.name,
      project_name: milestone.project_name
    })
    , { headers, responseType: 'text' as 'json'}).toPromise();
  }

  getEvents( fullName) {
    console.log(fullName);
    return this.http.get(this.eventApiEndpoint + '/', {responseType: 'json'}).toPromise();
  }


}
