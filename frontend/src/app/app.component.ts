import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProjectContainerComponent } from './components/project_container/project-container/project-container.component';
import { AuthenticationService } from './services/security/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'uksFrontend';
  test:String = 'Test';

  constructor(private router:Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {


  }

  checkRoute(){
    if(this.router.url === '/')return true;
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }


}
