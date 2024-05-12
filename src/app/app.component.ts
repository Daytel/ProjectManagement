import { Component, EventEmitter, Output } from '@angular/core';
import { Command } from 'src/pages/commands/commands.component';
import { Project } from 'src/pages/project/project.component';
import { Task } from 'src/pages/tasks/tasks.component';

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
  projects: Project[] = [];
  tasks: Task[] = [];
  commands: Command[] = []
  page: string = 'project';

  @Output()
  p = new EventEmitter<Project[]>();
  t = new EventEmitter<Task[]>();
  c = new EventEmitter<Command[]>()

  getProjects(event: Project[]){
    event.forEach(p => {
      if (!this.projects.includes(p)){this.projects.push(p);}
    })
  }

  getTasks(event: Task[]){
    event.forEach(t => {
      if (!this.tasks.includes(t)){this.tasks.push(t);}
    })
  }

  getCommands(event: Command[]){
    event.forEach(c => {
      if (!this.commands.includes(c)){this.commands.push(c);}
    })
  }

  viewPage(event: string){
    this.page = event;
  }
}
