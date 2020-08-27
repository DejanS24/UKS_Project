import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FetchService} from 'src/app/services/fetch.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {

  constructor(private router: Router,  private fetchService: FetchService) { }

  ngOnInit() {
    this.fetchService.getRepos('DejanS24').then(data => {
      console.log(data);
    }).catch(() => console.log('Hello user its caught'));
  }

  navigateToProjectOverview(event) {
    console.log(event);
    // write value to shared service and router navigate to project page
    this.router.navigate(['/project/' + event.name]);
  }
}
