import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectOverviewComponent } from './components/project_overview/project-overview.component';
import { IssueComponent } from './components/issues/issue/issue.component';

import {RouterModule, Routes} from '@angular/router';
import { ProjectContainerComponent } from './components/project_container/project-container/project-container.component';

const appRoutes = [
  {
    path : 'project/:id/:name',
    component : ProjectOverviewComponent
  },
  {
    path : 'issue',
    component : IssueComponent
  },
  {
    path : 'project/:id/:name/issue/:number',
    component : IssueComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectOverviewComponent,
    IssueComponent,
    ProjectContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
