import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconInputComponent } from './category-icon-input.component';

describe('CategoryIconInputComponent', () => {
  let component: CategoryIconInputComponent;
  let fixture: ComponentFixture<CategoryIconInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryIconInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryIconInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
