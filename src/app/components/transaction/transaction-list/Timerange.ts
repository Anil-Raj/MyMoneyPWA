import * as moment from 'moment';
import { SidebarService } from '../../../services/sidebar.service';

export class Timerange {

    constructor() {
    }

    getTimeRanges(a, viewByFilter): any {

        const timerange = [];
        const range: moment.unitOfTime.DurationConstructor = viewByFilter.range as moment.unitOfTime.DurationConstructor;
        console.log('adsfasd');
        const start = moment().startOf('day').add(-10, range);
        const end = moment().endOf('day');
        let day = start;

        while (day <= end) {
            if (range === 'month') {
                if (day.isSame(moment(), 'month')) {
                    timerange.push(
                        {
                            Label: 'This Month',
                            start: day.format(),
                            range: 'month'
                        });

                } else if (day.isSame(moment().add(-1, 'month'), 'month')) {
                    timerange.push(
                        {
                            Label: 'Last Month',
                            start: day.format(),
                            range: 'month'
                        });

                } else {
                    timerange.push({
                        Label: day.format('MM/YYYY'),
                        start: day.format(),
                        range: 'month'

                    });
                }
            } else if (range === 'week') {
                if (day.isSame(moment(), 'week')) {
                    timerange.push(
                        {
                            Label: 'This Week',
                            start: day.format(),
                            range: 'week'
                        });

                } else if (day.isSame(moment().add(-1, 'week'), 'week')) {
                    timerange.push(
                        {
                            Label: 'Last Week',
                            start: day.format(),
                            range: 'week'
                        });

                } else {
                    timerange.push(
                        {
                            Label: day.format('DD/MM') + ' - ' + day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM'),
                            start: day.format(),
                            range: 'week'
                        });
                }

            } else if (range === 'day') {
                if (day.isSame(moment(), 'day')) {
                    timerange.push(
                        {
                            Label: 'Today',
                            start: day.format(),
                            range: 'day'
                        });

                } else if (day.isSame(moment().add(-1, 'day'), 'day')) {
                    timerange.push(
                        {
                            Label: 'Yesterday',
                            start: day.format(),
                            range: 'day'
                        });

                } else {
                    timerange.push({
                        Label: day.format('D MMM YYYY'),
                        start: day.format(),
                        range: 'day'
                    });
                }
            }

            day = day.clone().add(1, range);
        }
        switch (range) {
            case 'day': timerange.push({
                isFuture: true,
                Label: 'Future',
                start: moment().endOf('day').clone().add(1, 's').format()
            });
                break;
            case 'month': timerange.push({
                isFuture: true,
                Label: 'Future',
                start: moment().endOf('month').add(1, 's').format()
            });
                break;
            case 'week': timerange.push({
                isFuture: true,
                Label: 'Future',
                start: moment().endOf('week').add(1, 's').format()
            });
                break;
        }

        console.log(timerange);
        return timerange;

    }
}
