import * as moment from 'moment';
import { SidebarService } from '../../../services/sidebar.service';

export class Timerange {

    constructor() {
    }

    getTimeRanges(viewByFilter): any {

        const timerangeList = [];
        const range: moment.unitOfTime.DurationConstructor = viewByFilter.range as moment.unitOfTime.DurationConstructor;
        console.log('adsfasd');
        const start = moment().startOf('day').add(-10, range);
        const end = moment().endOf('day');
        let day = start;

        while (day <= end) {
            if (range === 'month') {
                if (day.isSame(moment(), 'month')) {
                    timerangeList.push(
                        {
                            Label: 'This Month',
                            start: day.format(),
                            range: 'month'
                        });

                } else if (day.isSame(moment().add(-1, 'month'), 'month')) {
                    timerangeList.push(
                        {
                            Label: 'Last Month',
                            start: day.format(),
                            range: 'month'
                        });

                } else {
                    timerangeList.push({
                        Label: day.format('MM/YYYY'),
                        start: day.format(),
                        range: 'month'

                    });
                }
            } else if (range === 'week') {
                if (day.isSame(moment(), 'week')) {
                    timerangeList.push(
                        {
                            Label: 'This Week',
                            start: day.format(),
                            range: 'week'
                        });

                } else if (day.isSame(moment().add(-1, 'week'), 'week')) {
                    timerangeList.push(
                        {
                            Label: 'Last Week',
                            start: day.format(),
                            range: 'week'
                        });

                } else {
                    timerangeList.push(
                        {
                            Label: day.format('DD/MM') + ' - ' + day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM'),
                            start: day.format(),
                            range: 'week'
                        });
                }

            } else if (range === 'day') {
                if (day.isSame(moment(), 'day')) {
                    timerangeList.push(
                        {
                            Label: 'Today',
                            start: day.format(),
                            range: 'day'
                        });

                } else if (day.isSame(moment().add(-1, 'day'), 'day')) {
                    timerangeList.push(
                        {
                            Label: 'Yesterday',
                            start: day.format(),
                            range: 'day'
                        });

                } else {
                    timerangeList.push({
                        Label: day.format('D MMM YYYY'),
                        start: day.format(),
                        range: 'day'
                    });
                }
            }

            day = day.clone().add(1, range);
        }
        let futureTimerange = {
            isFuture: true,
            Label: 'Future',
            start: undefined
        }
        switch (range) {
            case 'day': futureTimerange.start = moment().endOf('day').clone().add(1, 's').format();
                break;
            case 'month': futureTimerange.start = moment().endOf('month').add(1, 's').format();
                break;
            case 'week': futureTimerange.start = moment().endOf('week').add(1, 's').format();
                break;
        }
        timerangeList.push(futureTimerange);
        return timerangeList;

    }
}
