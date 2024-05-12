import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../project/project.component';

export interface Command{
  id: number;
  name: string;
  participants: Participant[];
  projects: Project[];
}
 export interface Participant{
  name: string;
  surname: string;
  patronymic: string;
  role: Role;
  contact_inf: string;
}
enum Role{
  chief = "chief", // Глава
  worker = "worker" // Работник
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  commands: Command[] = []

  @Input()
  set c(c: Command[]){this.commands = c;}

  @Output()
  commands$ = new EventEmitter<Command[]>()
  @Output()
  page$ = new EventEmitter<string>();
}