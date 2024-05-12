import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant } from '../commands/commands.component';
import { Project } from '../project/project.component';
import { DataService } from 'src/service/senddata.servive';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Task{ // Задача
  project: Project;
  name: string; // Имя
  description: string; // Описание
  status: string; // Статус выполнения
  priority: string; // Приоритет
  executor: Participant; // Исполнитель
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  title = "Задачи"

  taskForm: FormGroup;
  tasks: Task[] = [];
  projects!: Project[];
  private Psubscribe: Subscription;
  participants!: Participant[];
  private ParSubscribe: Subscription;

  @Input()
  set t(t: Task[]){this.tasks = t;}

  @Output()
  tasks$ = new EventEmitter<Task[]>();
  @Output()
  page$ = new EventEmitter<string>();

  constructor(
    private ds: DataService,
    private fb: FormBuilder,
  ){
    this.Psubscribe = this.ds.projects$.subscribe(data => {
      this.projects = data;
    })
    this.ParSubscribe = this.ds.participants$.subscribe(data =>{
      this.participants = data;
    })
    this.taskForm = this.fb.group({
      name: new FormControl("", {validators: [Validators.required]}),
      description: [""],
      project: [null],
      priority: [""],
      status: [""],
      executor: [null]
    }
    )
  }

  ngOnDestroy(){
    this.Psubscribe.unsubscribe();
    this.ParSubscribe.unsubscribe();
  }

  addProject(){

  }
}
