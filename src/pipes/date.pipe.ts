import { formatDate } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'today'
})
export class DatePipe implements PipeTransform{
    transform(value: Date) {
        if (!value) return; // не дата - ничего не делает
        return formatDate(value, 'd.M.yyyy HH.mm.ss', 'en');
    }
}