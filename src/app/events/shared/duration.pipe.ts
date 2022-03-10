import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        switch(value) {
            case 1: return 'Half hour'
            case 2: return 'One hour'
            case 3: return 'Half Day'
            case 4: return 'One Day'
            default: return value.toString();
        }
    }
    
}