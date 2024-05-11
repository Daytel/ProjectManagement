import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchAll, switchMap, throwError } from "rxjs";
import { Command } from "src/app/pages/commands/commands.component";
import { Path, Project } from "src/app/app.component";
import { Task } from "src/app/pages/tasks/tasks.component";

@Injectable()
export class FileService{
    constructor(private http: HttpClient) {}

    writeToFile(data: any, filePath: string){
        let jsonData = JSON.stringify(data); // Преобразование объекта в строку JSON
        return this.http.post(filePath, jsonData, {responseType: 'text'}); // Запись объекта в текстовом формате
    }

    deleteFromFile(filePath: string, name: string){
        this.http.get<any[]>(filePath).pipe( // Получили массив объектов
            switchMap((data: any[]) => {
                const updateData = data.map(obj => JSON.parse(obj)); // Преобразуем объекты в нормальный вид
                const filteredData = updateData.filter(obj => obj.name !== name); // Сохраняем объекты имеющие другое имя
                const jsonString = filteredData.map(obj => JSON.stringify(obj)); // Преобразыем обратно в строки JSON
                return this.http.put(filePath, jsonString, {responseType: 'text'});
                // Перезаписали обновлённый массив
            }),
            catchError(error => {
                console.error("Ошибка при удалении объекта", error);
                return throwError("Ошибка при удалении объекта из файла");
            })
        );
    }

    getItemFromId(filePath: string, objectId: number): Observable<Project|Task|Command>{
        return this.http.get(filePath, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData = JSON.parse(data); // Преобразование строки в массив объектов
                let item =  jsonData.find((item: any) => item.number === objectId); // Ищем объект по id

                if (filePath == Path.projects){ // Определяем тип возврата
                    return item as Project;
                } else if (filePath == Path.tasks){
                    return item as Task;
                } else {
                    return item as Command;
                }
            }),
            catchError(error => {
                console.error("Ошибка при извлечении объекта", error);
                return throwError("Ошибка при извлечении объекта");
            })
        )
    }

    updateItemByName(filePath: string, name: string, updObject: any): Observable<any>{
        return this.http.get(filePath, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData = JSON.parse(data); // Преобразование строки в массив объектов
                const updatedData = jsonData.map((obj: any) => {
                    if (obj.name === name){
                        return updObject;
                    }
                    return obj;
                });

                const updateDataString = JSON.stringify(updatedData); // Преобразыем обратно в строки JSON
                return this.http.put(filePath, updatedData, {responseType: 'text'});
            }),
            catchError(error => {
                console.error("Ошибка при обновлении данных", error);
                return throwError("Ошибка при обновлении данных");
            })
        )
    }

    getCountOfObjects(filePath: string): Observable<number>{
        return this.http.get(filePath, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData = JSON.parse(data); // Преобразование строки в массив объектов
                if (Array.isArray(jsonData)){
                    return jsonData.length;
                } else {
                    return 0;
                }
            }),
            catchError(error => {
                console.error("Ошибка при определении числа объектов", error);
                return throwError("Ошибка при определении числа объектов");
            })
        )
    }

    getNameCommandByNameProject(name: string): Observable<string>{
        return this.http.get(Path.commands, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData: Command[] = JSON.parse(data); // Преобразование строки в массив объектов
                let item = jsonData.find((item: Command) => item.name === name);
                if (item != undefined){
                    return item.name
                } else {
                    return "Нет команды, взявший данный проект"
                }
            }),
            catchError(error => {
                console.error("Ошибка при определении команды проекта", error);
                return throwError("Ошибка при определении команды проекта");
            })
        )
    }
    getNames(filePath: string): Observable<string[]>{
        return this.http.get(filePath, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData = JSON.parse(data); // Преобразование строки в массив объектов
                let names: string[] = [];
                jsonData.forEach((element: Project|Task|Command) => {
                    names.push(element.name);
                });
                return names;
            }),
            catchError(error => {
                console.error("Ошибка при определении команды проекта", error);
                return throwError("Ошибка при определении команды проекта");
            })
        )
    }

    getAllObjects(filePath: string): Observable<Project[]|Task[]|Command[]>{
        return this.http.get(filePath, {responseType: 'text'}).pipe( // Запрос данных в виде текста
            map((data: string) => {
                const jsonData = JSON.parse(data); // Преобразование строки в массив объектов

                if (filePath == Path.projects){ // Определяем тип возврата
                    return jsonData as Project[];
                } else if (filePath == Path.tasks){
                    return jsonData as Task[];
                } else {
                    return jsonData as Command[];
                }
            }),
            catchError(error => {
                console.error("Ошибка при извлечении объектов", error);
                return throwError("Ошибка при извлечении объектов");
            })
        )
    }
}