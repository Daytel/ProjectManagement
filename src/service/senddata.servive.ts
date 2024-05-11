import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService{
    private dataSubject = new Subject<any>(); // Создали объект передачи
    data$ = this.dataSubject.asObservable(); // Добавили наблюдателя

    sendData(data: any){
        this.dataSubject.next(data); // Получаем данные
    }
}