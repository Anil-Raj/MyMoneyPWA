import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value + '');
    const today = new Date();
    const timeDiff = today.getTime() - date.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays === -1) {
        return 'Yesterday';
    }
    switch (date.getDay()) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thurday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 0: return 'Sunday';
    }
  }

}
