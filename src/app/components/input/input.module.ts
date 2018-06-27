import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { MatToolbarModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatListModule, MatDatepickerModule, MatRippleModule, MatCardModule, MatTabsModule, MatIconModule, MatGridListModule } from '@angular/material';
import { CategoryIconInputComponent } from './category-icon-input/category-icon-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatGridListModule


  ],
  declarations: [AmountInputComponent, CategoryIconInputComponent],
  exports: [AmountInputComponent, CategoryIconInputComponent]
})
export class InputModule { }
