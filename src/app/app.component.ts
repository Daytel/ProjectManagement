import { Component, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileService } from 'src/service/handitem.service';
import { DataService } from 'src/service/senddata.servive';
import { Command } from './pages/commands/commands.component';
import { Task } from './pages/tasks/tasks.component';
import { map, Observable } from 'rxjs';

export interface Project{ // Проект
  number: number; // Порядковый номер
  name: string; // Имя
  description: string; // Описание
  dateCreation: Date; // Дата создания
  dateChange: Date; // Дата изменения
}

export enum Path{
  projects = 'assets/projects.json',
  tasks = 'assets/projetc_tasks.json',
  commands = 'assets/commands.json'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Менеджмент проекта';
  

  edit: boolean = false;
  number = signal<number>(1, {equal: (a: number, b: number) => a==b});
  buf_number: number = 0;
  dataCreation = signal<Date>(new Date(), {equal: (a: Date, b: Date) => a==b});

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private fs: FileService, private ds: DataService){
    this.projectForm = this.fb.group({
      name: ["", [Validators.required, this.notNameRepeat]],
      description: [""]
    });
  }

  addProject(){
    let item: Project = this.projectForm.getRawValue();
    item.number = this.number();
    item.dateCreation = new Date();
    item.dateChange = item.dateCreation;
    this.fs.writeToFile(item, Path.projects).subscribe(() => {
      alert("Проект успешно добавлен!");
    });
  }

  deleteProject(index: number){
    this.fs.getItemFromId(Path.projects, index).pipe(
      map((item: Project|Task|Command) => {
        return item as Project; // Преобразуем к типу Project
      })
    ).subscribe((project: Project) => {
      this.fs.deleteFromFile(Path.projects, project.name); // Удаляем объект
    });
  }

  editProject(index: number, edit: boolean){
    if (this.edit == false){
      this.fs.getItemFromId(Path.projects, index).pipe(
        map((item: Project|Task|Command) => {
          return item as Project; // Преобразуем к типу Project
        })
      ).subscribe((project: Project) => {
        this.projectForm.patchValue(project); // Записываем данные в форму
        this.edit = !this.edit;
        this.buf_number = this.number();
        this.number.set(index + 1);
        this.dataCreation.set(project.dateCreation);
        window.scrollTo({top: 0}); // Перемещаем окно к заполнению формы
      });
    }
    else {
      this.edit = !this.edit;
      let item: Project = this.projectForm.getRawValue();
      item.number = this.number();
      item.dateCreation = this.dataCreation();
      item.dateChange = new Date();
      this.fs.getItemFromId(Path.projects, index).pipe(
        map((item: Project|Task|Command) => {
          return item as Project; // Преобразуем к типу Project
        })
      ).subscribe((project: Project) => {
        this.fs.updateItemByName(Path.projects, project.name, item);
        this.number.set(this.buf_number + 1);
      });
    }
  }

  viewTasks(index: number){
    this.ds.sendData(this.fs.getItemFromId(Path.projects, index));
  }

  viewCommand(index: number){
    this.ds.sendData(this.fs.getItemFromId(Path.projects, index));
  }

  notNameRepeat(control: FormControl): {[s: string]: boolean} | null {
    let valObj: {[s: string]: boolean} | null = null;
    this.fs.getNames(Path.projects).subscribe((names: string[]) => {
      if (names.length == 0 || names.indexOf(control.value) == -1){
        valObj = {"name": true};
      }
    });
    return valObj;
  }
}
