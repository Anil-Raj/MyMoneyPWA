import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewByPipe } from './view-by/view-by.pipe';
import { GroupByPipe } from './group-by/group-by.pipe';
import { DatePipe } from './date/date.pipe';
import { DayPipe } from './day/day.pipe';
import { MonthPipe } from './month/month.pipe';
import { YearPipe } from './year/year.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ViewByPipe,
    GroupByPipe,
    DatePipe,
    DayPipe,
    MonthPipe,
    YearPipe,
  ],
  exports:[
    ViewByPipe,
    GroupByPipe,
    DatePipe,
    DayPipe,
    MonthPipe,
    YearPipe,
  ]
})
export class CustomPipeModule { }
