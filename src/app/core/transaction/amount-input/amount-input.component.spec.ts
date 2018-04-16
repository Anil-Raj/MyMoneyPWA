import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountInputComponent } from './amount-input.component';

describe('amountInputComponent', () => {
  let component: AmountInputComponent;
  let fixture: ComponentFixture<AmountInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
