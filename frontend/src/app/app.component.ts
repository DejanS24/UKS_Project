import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'uksFrontend';
  test:String = 'Test';

  constructor(private router:Router) { }

  ngOnInit() {


  }

  checkRoute(){
    if(this.router.url === '/')return true;
    return false;
  }




}