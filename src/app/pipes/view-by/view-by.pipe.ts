import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'viewBy'
})
export class ViewByPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let filteredData = [];
        if (value) {
            filteredData = value.filter(transaction => {
                if (args.isFuture) {
                    if (moment(transaction.time).add(1, 'm').isBetween(
                        moment(args.start).startOf('D'),
                        moment(args.start).endOf('D').add(3, 'M'))) {
                        return transaction;
                    }
                }
                if (args.range === 'day') {
                    if (moment(transaction.time).add(1, 'm').isBetween(
                        moment(args.start).startOf('D'),
                        moment(args.start).endOf('D')
                    )) {
                        return transaction;
                    }
                } else if (args.range === 'week') {

                    if (moment(transaction.time).add(1, 'm').isBetween(
                        moment(args.start).startOf('w'),
                        moment(args.start).endOf('w')
                    )) {
                        return transaction;
                    }

                } else if (args.range === 'month') {

                    if (moment(transaction.time).add(1, 'm').isBetween(
                        moment(args.start).startOf('M'),
                        moment(args.start).endOf('M')
                    )) {
                        return transaction;
                    }

                } else if (moment(transaction.time).isBetween(
                    moment().startOf(args.range),
                    moment().endOf(args.range)
                )) {
                    return transaction;
                }

            });
        }
        return filteredData;
    }

}
