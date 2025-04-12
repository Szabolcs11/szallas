import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'HUF'): string {
    if (!value) return '';
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}
