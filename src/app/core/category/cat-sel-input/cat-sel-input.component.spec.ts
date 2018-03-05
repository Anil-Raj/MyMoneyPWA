import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSelInputComponent } from './cat-sel-input.component';

describe('CatSelInputComponent', () => {
  let component: CatSelInputComponent;
  let fixture: ComponentFixture<CatSelInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSelInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
