import { Component } from '@angular/core';
import { Participant } from '../commands/commands.component';
import { Project } from 'src/app/app.component';

export interface Task{ // Задача
  project: Project;
  name: string; // Имя
  description: string; // Описание
  status: Status; // Статус выполнения
  priority: Priority; // Приоритет
  executor: Participant; // Исполнитель
}
enum Status{
  done = "done", // готово
  ad = "almost dont", // почти готово
  iDev = "in development", // В разработке
  ns = "not started" // не начато
}
enum Priority{
  urgently = "urgently", // срочно
  im = "important", // важно
  nec = "necessary", // необходимо
  wb = "would be nice" // было бы неплохо
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

}
