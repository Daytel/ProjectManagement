import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Command, Participant } from "src/pages/commands/commands.component";
import { Project } from "src/pages/project/project.component";
import { Task } from "src/pages/tasks/tasks.component";

@Injectable({
    providedIn: "root"
})
export class DataService{
    private projectsSubject = new Subject<Project[]>(); // Объект хранения проектов
    projects$ = this.projectsSubject.asObservable(); // Наблюдатель проектов
    private tasksSubject = new Subject<Task[]>(); // Объект хранения задач
    tasks$ = this.tasksSubject.asObservable(); // Наблюдатель для задач
    private commandSubject = new Subject<Command[]>(); // Объект хранения комманд
    commands$ = this.commandSubject.asObservable(); // Наблюдатель для команд
    private participantsSubject = new Subject<Participant[]>(); // Объект хранения работников
    participants$ = this.participantsSubject.asObservable(); // Наблюдатель работников

    sendProjects(data: Project[]){
        this.projectsSubject.next(data); // Передаём данные
    }
    sendParticipants(data: Participant[]){
        this.participantsSubject.next(data); // Передаём данные
    }
    sendTasks(data: Task[]){
        this.tasksSubject.next(data); // Передаём данные
    }
    sendCommands(data: Command[]){
        this.commandSubject.next(data); // Передаём данные
    }
}