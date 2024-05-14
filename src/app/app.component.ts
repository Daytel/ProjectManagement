import { Component, Output } from '@angular/core';

export enum Path{
  projects = 'http://localhost:3000/projects',
  tasks = 'http://localhost:4000/tasks',
  commands = 'http://localhost:5000/commands'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
}
