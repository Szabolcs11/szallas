import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'HUF'): string {
    if (!value) return '';
    const formattedNumber = value.toLocaleString('hu-HU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${currencyCode} ${formattedNumber}`;
  }
}
