import { GroupByPipe } from './group-by.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewByPipe } from '../view-by/view-by.pipe';

@NgModule({
    imports: [BrowserModule],
    declarations: [GroupByPipe, ViewByPipe],
    exports: [GroupByPipe, ViewByPipe]
})
export class GroupByModule { }
