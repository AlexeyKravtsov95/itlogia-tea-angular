import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
})
export class ShortTextPipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 220 ? value.substring(0, 220) + '...' : value;
  }
}
