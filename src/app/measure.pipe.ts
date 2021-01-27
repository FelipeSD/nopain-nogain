import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measure'
})
export class MeasurePipe implements PipeTransform {

  transform(value: number, extension: string = "m"): string {
    return (value/100).toFixed(2) + extension;
  }

}
