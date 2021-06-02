import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: any[], key: string): any[] {
    if(!list) return [];
    if(!list[0][key]) return list;

    return list.sort((a, b) => {
      if(a[key] > b[key]) {
        return 1;
      }

      if(a[key] < b[key]) {
        return -1;
      }

      return 0;
    })
  }

}
