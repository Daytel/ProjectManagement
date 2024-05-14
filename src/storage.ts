import { Project } from "./pages/project/project.component";
import { Task } from "./pages/tasks/tasks.component";
import { Command, Participant } from "./pages/commands/commands.component";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Storage{
    private p: Project[] = [];
    private t: Task[] = [];
    private c: Command[] = [];

    getProjects(){
        return this.p;
    }
    setProjects(p: Project[]){
        this.p = p;
    }
    getTasks(){
        return this.t;
    }
    setTasks(t: Task[]){
        this.t = t;
    }
    getCommands(){
        return this.c;
    }
    setCommands(c: Command[]){
        this.c = c;
    }
}