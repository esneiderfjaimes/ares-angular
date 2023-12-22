import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(value: number | string, locale?: string): string {
    return (
      '$' +
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(value))
    );
  }
}
