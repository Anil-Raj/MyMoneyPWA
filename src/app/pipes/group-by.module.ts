import { GroupByPipe } from './group-by.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [BrowserModule],
    declarations: [GroupByPipe],
    exports: [GroupByPipe]
})
export class GroupByModule { }
