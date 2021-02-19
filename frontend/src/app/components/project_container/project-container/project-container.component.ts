import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FetchService} from 'src/app/services/fetch.service';
import { AuthenticationService } from 'src/app/services/security/authentication-service.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {

  constructor(private router: Router,  private fetchService: FetchService, private sharedService: SharedDataService, private authService : AuthenticationService) { }

  private repos = [];

  ngOnInit() {
    let user = this.authService.getCurrentUser();
    console.log(user);
    this.fetchService.getRepos(user.owner).then(data => {
      this.wrapResponse(data);
    }).catch(() => console.log('Hello user its caught'));
  }


  wrapResponse(data) {
    this.repos = data;
    console.log(this.repos);
  }

  navigateToProjectOverview(event) {
    console.log(event);
    // write value to shared service and router navigate to project page
    this.sharedService.setFocusedObject(event.full_name);
    this.router.navigate(['/project/' + event.full_name]);
  }

  resetRepo() {
    this.repos = [];
  }
}
