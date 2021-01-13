import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotpermittedComponent } from './notpermitted.component';

describe('NotpermittedComponent', () => {
  let component: NotpermittedComponent;
  let fixture: ComponentFixture<NotpermittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotpermittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotpermittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
