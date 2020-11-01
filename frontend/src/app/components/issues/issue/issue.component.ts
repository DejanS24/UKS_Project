import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  constructor(private fetchService: FetchService) { }

  ngOnInit() {
    this.fetchService.getEvents("s").then(data => {
      console.log(data);
    })
  }

}
