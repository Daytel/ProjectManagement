import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Storage } from 'src/storage';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Command{
  index: number;
  name: string;
  participants: Participant[];
}
 export interface Participant{
  command: string;
  name: string;
  surname: string;
  patronymic: string;
  role: string;
  contact_inf: string;
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css'],
})
export class CommandsComponent implements OnInit, OnDestroy{
  commands: Command[] = []
  edit: boolean = false;
  index = signal<number>(0, {equal: (a: number, b: number) => a==b});
  commandForm: FormGroup;
  role: string[] = ["Глава", "Разработчик"];

  constructor(
    private s: Storage,
    private root: Router,
    private fb: FormBuilder
  ){
    this.commandForm = this.fb.group({
      "name": new FormControl("", {validators: [Validators.required]}),
      participants: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.commands = this.s.getCommands();
  }

  ngOnDestroy(): void {
    this.s.setCommands(this.commands);
  }

  addParticipant(){
    const newParticipant = this.fb.group({
      command: new FormControl(this.commandForm.value.name, Validators.required),
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      patronymic: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      contact_inf: new FormControl("", {validators: [Validators.required, Validators.email]})
    });
    (this.commandForm.get("participants") as FormArray).push(newParticipant);
  }
  removeParticipant(index: number){
    (this.commandForm.get("participants") as FormArray).removeAt(index);
  }
  get participants(){
    return (this.commandForm.get('participants') as FormArray).controls;
  }

  addCommand(){
    let item: Command = this.commandForm.getRawValue();
    item.index = this.index();
    this.commands.push(item);
    this.index.set(this.index() + 1);
    this.commandForm.reset();
  }

  deleteCommand(index: number){
    this.commands.splice(index, 1);
    this.commands.forEach((command: Command, i: number) => {
      command.index = i;
    })
    this.index.set(this.index() - 1);
  }

  editCommand(index: number){
    if (!this.edit){
      this.commandForm.patchValue(this.commands[index]);
      while(this.participants.length < this.commands[index].participants.length){
        this.addParticipant();
      }
      this.commands[index].participants.forEach((par: Participant, i: number) => {
        this.patchPerticipant(i, par);
      })
      this.edit = !this.edit;
      this.index.set(index);
      window.scrollTo({top: 0});
    }
    else {
      this.edit = !this.edit;
      let item: Command = this.commandForm.getRawValue();
      item.index = this.index()
      this.commands[item.index] = item;
      this.index.set(this.commands.length);
      this.commandForm.reset();
    }
  }

  patchPerticipant(index: number, data: Participant){
    const participant = this.participants.at(index);
    participant?.patchValue(data);
  }

  viewProjects(){
    this.root.navigate(["/"]);
  }

  viewTasks(){
    this.root.navigate(['/tasks']);
  }
}
