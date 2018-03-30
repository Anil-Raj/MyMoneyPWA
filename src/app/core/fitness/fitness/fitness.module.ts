import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitnessComponent } from './fitness.component';
import { GroupByModule } from '../../../pipes/group-by.module';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        GroupByModule,
        MatListModule,
        RouterModule

    ],
    declarations: [
        FitnessComponent
    ]
})
export class FitnessModule { }
