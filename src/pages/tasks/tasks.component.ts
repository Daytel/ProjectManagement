import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Command, Participant } from '../commands/commands.component';
import { Project } from '../project/project.component';
import { Storage } from 'src/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Task{ // Задача
  index: number; // Индекс
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
export class TasksComponent implements OnInit, OnDestroy{
  title = "Задачи"

  taskForm: FormGroup;
  tasks: Task[] = [];
  projects: Project[] = [];
  commands: Command[] = [];
  edit: boolean = false;
  index = signal<number>(0, {equal:(a: number, b: number) => a==b});
  priority: string[] = ["Срочно","Важно","Необходимо","Было бы неплохо"];
  status: string[] = ["Готово", "Почти готово", "В разработке", "Не начато"];

  constructor(
    private s: Storage,
    private fb: FormBuilder,
    private root: Router
  ){
    this.taskForm = this.fb.group({
      "name": new FormControl("", {validators: [Validators.required]}),
      "description": [""],
      "project": new FormControl (null, {validators: [Validators.required]}),
      "priority": new FormControl ("", {validators: [Validators.required]}),
      "status": new FormControl("", {validators: [Validators.required]}),
      "executor": new FormControl (null, {validators: [Validators.required]})
    })
  }

  ngOnInit(): void {
    this.projects = this.s.getProjects();
    this.tasks = this.s.getTasks();
    this.commands = this.s.getCommands();
  }

  ngOnDestroy(): void {
    this.s.setTasks(this.tasks);
  }

  addTask(){
    let item: Task = this.taskForm.getRawValue();
    item.index = this.index();
    this.tasks.push(item);
    this.index.set(this.index() + 1);
    this.taskForm.reset();
  }

  deleteTask(index: number){
    this.tasks.splice(index, 1);
    this.tasks.forEach((task: Task, i: number) => {
      task.index = i;
    })
    this.index.set(this.index() - 1);
  }

  editTask(index: number){
    if (!this.edit){
      this.taskForm.patchValue(this.tasks[index]);
      this.edit = !this.edit;
      this.index.set(index);
      window.scrollTo({top: 0});
    }
    else{
      this.edit = !this.edit;
      let item: Task = this.taskForm.getRawValue();
      item.index = this.index();
      this.tasks[item.index] = item;
      this.index.set(this.tasks.length);
      this.taskForm.reset();
    }
  }

  patchParticipant(index: number, number: number, data: Participant){
    const participant = this.taskForm.value.participant;
    participant?.patchValue(data);
  }

  viewProjects(){
    this.root.navigate(["/"]);
  }

  viewCommands(){
    this.root.navigate(['/commands']);
  }
}
