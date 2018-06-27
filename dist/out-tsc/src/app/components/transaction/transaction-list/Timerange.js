"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Timerange = /** @class */ (function () {
    function Timerange() {
    }
    Timerange.prototype.getTimeRangeList = function (viewByFilter) {
        var timerangeList = [];
        var range = viewByFilter.range;
        var start = moment().startOf('day').add(-10, range);
        var end = moment().endOf('day');
        // console.log(start, end);
        var day = start;
        while (day <= end) {
            switch (range) {
                case 'month':
                    timerangeList.push(this.getTimeRange(day, range));
                    break;
                case 'week':
                    timerangeList.push(this.getTimeRange(day, range));
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
    };
    Timerange.prototype.getTimeRange = function (day, range) {
        var timerange = { Label: undefined, start: day.format(), range: range };
        if (range === 'month' || range === 'week' || range === 'day') {
            if (day.isSame(moment(), range)) {
                timerange.Label = range === 'day' ? 'Today' : 'This ' + range;
            }
            else if (day.isSame(moment().add(-1, range), range)) {
                timerange.Label = range === 'day' ? 'Yesterday' : 'Last ' + range;
            }
            else {
                if (range === 'week') {
                    timerange.Label = day.format('DD/MM') + ' - ' + day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM');
                }
                else if (range === 'month') {
                    timerange.Label = day.format('MM/YYYY');
                }
                else {
                    timerange.Label = day.format('D MMM YYYY');
                }
            }
        }
        return timerange;
    };
    return Timerange;
}());
exports.Timerange = Timerange;
//# sourceMappingURL=Timerange.js.map