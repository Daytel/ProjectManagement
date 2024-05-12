import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Participant } from "src/pages/commands/commands.component";
import { Project } from "src/pages/project/project.component";

@Injectable({
    providedIn: "any"
})
export class DataService{
    private projectsSubject = new Subject<Project[]>(); // Объект передачи проектов
    projects$ = this.projectsSubject.asObservable(); // Наблюдатель проектов
    private participantsSubject = new Subject<Participant[]>(); // Объект передачи работников
    participants$ = this.participantsSubject.asObservable(); // Наблюдатель работников

    sendProjects(data: Project[]){
        this.projectsSubject.next(data); // Получаем данные
    }
    sendParticipants(data: Participant[]){
        this.participantsSubject.next(data);
    }
}