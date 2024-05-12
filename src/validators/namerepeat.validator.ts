import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, catchError, of } from "rxjs";
import { FileService } from "src/service/handitem.service";

@Injectable({
    providedIn: 'root'
})
export class CustomValidators{
    constructor(private fs: FileService){}

    notNameRepeat(filePath: string): AsyncValidatorFn{
        return (control: AbstractControl) => {
            return this.fs.getNames(filePath).pipe(
                map((names: string[]) => {
                    return names.includes(control.value) ? { nameRepeat: true} : null;
                }),
                catchError(() => of(null)) // Обработка ошибки
            )
        }
    }
}