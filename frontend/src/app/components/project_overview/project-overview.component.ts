import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  public user;
  name;
  comments;
  issueSelected;
  contentDisplay ;
  private fullName;
  private id;
  private issues;
  issue;

  constructor(private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService, private fetchService: FetchService, private router:Router) { 
     this.user = {};
     this.issue = {};
    }
  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.name = params.get('name');
    });
    // this.fetchService.getIssues(this.id + '/' + this.name).then(data => {
    //   console.log(data);
    //   this.issues = data;
    // });

    // same for db issues
  }

  navigateToIssue(issue){
    this.router.navigate([this.router.url + '/issue/' + issue.number]);
  }

  createIssue(){
    console.log('hej')
  }

  newIssue():void{
    this.fetchService.createIssue(this.issue);
  }

  loadComments(){
    this.contentDisplay = "Comments";
    if(this.comments === undefined){
      //api call to get comments
      this.comments = ["Hello", "World", "Last", "Time"];
      return this.comments;
    }
    return this.comments;
  }

  loadIssues(event){
    console.log(event);
    this.contentDisplay = "Issues";
  }

  loadLabels(){
    this.contentDisplay = "Labels";
  }

}
