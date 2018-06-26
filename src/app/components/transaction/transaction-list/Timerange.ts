import * as moment from 'moment';
import { SidebarService } from '../../../services/sidebar.service';

export class Timerange {

    constructor() {
    }

    getTimeRangeList( viewByFilter): any {

        const timerangeList = [];
        const range: moment.unitOfTime.DurationConstructor = viewByFilter.range as moment.unitOfTime.DurationConstructor;
        const start = moment().startOf('day').add(-10, range);
        const end = moment().endOf('day');
        // console.log(start, end);

        let day = start;

        while (day <= end) {
            switch (range) {
                case 'month': timerangeList.push(this.getTimeRange(day, range));
                    break;
                case 'week': timerangeList.push(this.getTimeRange(day, range));
                    break;

                case 'day': timerangeList.push(this.getTimeRange(day, range));

            }
            day = day.clone().add(1, range);
        }
        timerangeList.push({
            isFuture: true,
            Label: 'Future',
            start: moment().endOf(range).clone().add(1, 's').format()
        });

        // console.log(timerangeList);s
        return timerangeList;
    }
    getTimeRange(day, range) {
        const timerange = { Label: undefined, start: day.format(), range: range };
        if (range === 'month' || range === 'week' || range === 'day') {
            if (day.isSame(moment(), range)) {
                timerange.Label = range === 'day' ? 'Today' : 'This ' + range;

            } else if (day.isSame(moment().add(-1, range), range)) {
                timerange.Label = range === 'day' ? 'Yesterday' : 'Last ' + range;


            } else {
                if (range === 'week') {
                    timerange.Label = day.format('DD/MM') + ' - ' + day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM');
                } else if (range === 'month') {
                    timerange.Label = day.format('MM/YYYY');

                } else {
                    timerange.Label = day.format('D MMM YYYY');

                }
            }

        }
        return timerange;
    }
}
