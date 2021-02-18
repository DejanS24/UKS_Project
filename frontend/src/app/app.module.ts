import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectOverviewComponent } from './components/project_overview/project-overview.component';
import { IssueComponent } from './components/issues/issue/issue.component';

import {RouterModule, Routes} from '@angular/router';
import { ProjectContainerComponent } from './components/project_container/project-container/project-container.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuardGuard} from './services/security/login-guard.guard';
import { AuthGuardGuard } from './services/security/auth-guard.guard';
import { AuthenticationService } from './services/security/authentication-service.service';
import { TokenInterceptorService } from './services/security/token-interceptor.service';
import { RegisterComponent } from './components/register/register/register.component';
import {  ReactiveFormsModule } from '@angular/forms';


const appRoutes = [
  {
    path: 'login',
    component: LoginComponent, 
    canActivate: [LoginGuardGuard] 
  },
  {
    path : 'project/:id/:name',
    component : ProjectOverviewComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'issue',
    component : IssueComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'project/:id/:name/issue/:number',
    component : IssueComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'register',
    component : RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectOverviewComponent,
    IssueComponent,
    ProjectContainerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthenticationService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
