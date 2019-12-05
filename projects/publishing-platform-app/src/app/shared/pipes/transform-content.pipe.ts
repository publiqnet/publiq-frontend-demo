import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformContent'
})
export class TransformContentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return null;
  }

}
