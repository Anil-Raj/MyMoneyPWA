import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'viewBy'
})
export class ViewByPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        console.log(args);
        let filteredData = [];
        if (value) {
            filteredData = value.filter(transaction => {
                if (args.range === 'date') {
                    if (args.value === 1) {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('D').add(1, 'd'),
                            moment().endOf('D').add(1000, 'd')
                        )) {
                            return transaction;
                        }

                    } else {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('D').add(args.value, 'd'),
                            moment().endOf('D').add(args.value, 'd')
                        )) {
                            return transaction;
                        }
                    }

                } else if (args.range === 'week') {
                    if (args.value === 1) {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('w').add(1, 'w'),
                            moment().endOf('s').add(1000, 'w')
                        )) {
                            return transaction;
                        }

                    } else {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('w').add(args.value, 'w'),
                            moment().endOf('w').add(args.value, 'w')
                        )) {
                            return transaction;
                        }
                    }

                } else if (args.range === 'month') {
                    if (args.value === 1) {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('M').add(1, 'M'),
                            moment().endOf('M').add(1000, 'M')
                        )) {
                            return transaction;
                        }

                    } else {
                        if (moment(transaction.time).add(1, 'h').isBetween(
                            moment().startOf('M').add(args.value, 'M'),
                            moment().endOf('M').add(args.value, 'M')
                        )) {
                            return transaction;
                        }
                    }
                } else if (moment(transaction.time).isBetween(
                    moment().startOf(args.range),
                    moment().endOf(args.range)
                )) {
                    return transaction;
                }

            });
            console.log(filteredData);
        }
        return filteredData;
    }

}
