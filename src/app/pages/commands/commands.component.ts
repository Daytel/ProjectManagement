import { Component } from '@angular/core';
import { Project } from 'src/app/app.component';

export interface Command{
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

}
