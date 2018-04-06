import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupBy',
    pure: true
})
export class GroupByPipe implements PipeTransform {

    transform(value: Array<any>, field: string): Array<any> {
        if (value) {
            const groupedObj = value.reduce((prev, cur) => {
                // console.log(prev, cur, );

                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur];
                } else {
                    prev[cur[field]].push(cur);
                }
                return prev;
            }, {});
            console.log(Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] })));

            return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        }
        return null;
    }

}

