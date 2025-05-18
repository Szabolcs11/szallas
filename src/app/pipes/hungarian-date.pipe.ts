import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore'; // Import Firebase Timestamp

@Pipe({
  name: 'hungarianDate',
  standalone: true,
})
export class HungarianDatePipe implements PipeTransform {
  transform(value: string | Date | Timestamp): string {
    let date: Date;

    if (value instanceof Timestamp) {
      date = value.toDate();
    } else {
      date = new Date(value);
    }

    // Format the date in Hungarian format
    return date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
