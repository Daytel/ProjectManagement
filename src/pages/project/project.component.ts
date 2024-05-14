import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from 'src/storage.service';
import { Router } from '@angular/router';

export interface Project{ // Проект
  index: number;
  name: string; // Имя
  description: string; // Описание
  dateCreation: Date; // Дата создания
  dateChange: Date; // Дата изменения
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy{
  title = 'Менеджмент проекта';

  edit: boolean = false;
  index = signal<number>(0, {equal: (a: number, b: number) => a==b});
  dataCreation = signal<Date>(new Date(), {equal: (a: Date, b: Date) => a==b});

  projectForm: FormGroup;
  projects: Project[] = [];
  
  constructor(
    private fb: FormBuilder,
    private s: Storage,
    private root: Router){
    this.projectForm = this.fb.group({
      "name": new FormControl("", [Validators.required]),
      "description": [""]
    });
  }

  ngOnInit(): void {
    this.projects = this.s.getProjects();
  }

  ngOnDestroy(): void {
    this.s.setProjects(this.projects);
  }

  addProject(){
    let item: Project = this.projectForm.getRawValue();
    item.index = this.index();
    item.dateCreation = new Date();
    item.dateChange = item.dateCreation;
    this.projects.push(item);
    this.index.set(this.index() + 1);
    this.projectForm.reset();
  }

  deleteProject(index: number){
    this.projects.splice(index, 1);
    this.projects.forEach((proj: Project, i: number) =>{
      proj.index = i;
    })
    this.index.set(this.index() - 1);
  }

  editProject(index: number){
    if (this.edit == false){
      this.projectForm.patchValue(this.projects[index]);
      this.edit = !this.edit;
      this.index.set(index);
      this.dataCreation.set(this.projects[index].dateCreation);
      window.scrollTo({top: 0});
    }
    else {
      this.edit = !this.edit;
      let item: Project = this.projectForm.getRawValue();
      item.index = this.index();
      item.dateCreation = this.dataCreation();
      item.dateChange = new Date();
      this.projects[item.index] = item;
      this.index.set(this.projects.length);
      this.projectForm.reset();
    }
  }

  viewTasks(){
    this.root.navigate(['/tasks']);
  }

  viewCommand(){
    this.root.navigate(['/commands']);
  }
}
