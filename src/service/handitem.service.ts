import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, switchMap, throwError } from "rxjs";
import { Command } from "src/pages/commands/commands.component";
import { Path } from "src/app/app.component";
import { Project } from "src/pages/project/project.component";
import { Task } from "src/pages/tasks/tasks.component";

@Injectable({
    providedIn: 'root'
})
export class FileService{
    constructor(private http: HttpClient) {}

    getAllObjects(filePath: string): Observable<Project[]|Task[]|Command[]>{
        return this.http.get<any[]>(filePath).pipe( // Запрос данных в виде текста
            map((data: any[]) => {
                if (filePath == Path.projects){ // Определяем тип возврата
                    return data as Project[];
                } else if (filePath == Path.tasks){
                    return data as Task[];
                } else {
                    return data as Command[];
                }
            }),
            catchError(error => {
                console.error("Ошибка при извлечении объектов", error);
                return throwError(() => new Error("Ошибка при извлечении объектов"));
            })
        );
    }

    deleteAllObjects(filePath: string){
        this.http.delete(filePath);
    }

    pushAllObjects(filePath: string, data: (Project|Task|Command)[]){
        data.forEach(elem => {
            this.http.post(filePath, elem);
        })
    }
}