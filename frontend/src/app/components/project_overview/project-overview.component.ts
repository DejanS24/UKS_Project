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
  id;
  githubUrl;
  comments;
  issueSelected;
  contentDisplay ;
  private fullName;
  private issues;
  private labels;
  issue;
  label;
  milestone;
  createIssueVisible = false;
  createLabelVisible = false;
  createMilestoneVisible = false;

  constructor(private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService, private fetchService: FetchService, private router:Router) { 
     this.user = {};
     this.issue = {};
     this.label = {};
     this.milestone = {};
    }
  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.name = params.get('name');
      this.githubUrl = "https://github.com/"+this.id+"/"+this.name;
    });
    this.fetchService.getIssues(this.id + '/' + this.name).then(data => {
      console.log(data);
      console.log("issssues");
      this.issues = data;
    },
    error => {
      console.log(error);
    });

    this.fetchService.getLabels().subscribe(data => {
      console.log(data);
      this.labels = JSON.parse(data+"");
    })
    // same for db issues
  }

  navigateToIssue(issue){
    this.router.navigate([this.router.url + '/issue/' + issue.number]);
  }

  createIssueForm(){
    this.createIssueVisible = !this.createIssueVisible
  }

  createLabelForm(){
    this.createLabelVisible = !this.createLabelVisible
  }

  createMilestoneForm(){
    this.createMilestoneVisible = !this.createMilestoneVisible
  }

  createIssue(){
    console.log('hej')
  }

  newIssue():void{
    this.issue["project_name"]=this.name;
    this.fetchService.createIssue(this.issue);
  }

  newLabel(){
    this.fetchService.createLabel(this.label);
  }

  newMilestone(){
    this.milestone["project_name"]=this.name;
    this.fetchService.createMilestone(this.milestone);
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
