import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  name:String;
  comments:Array<{}>;
  issueSelected:boolean;
  contentDisplay : String;

  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.name = params.get('id');
    });
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
