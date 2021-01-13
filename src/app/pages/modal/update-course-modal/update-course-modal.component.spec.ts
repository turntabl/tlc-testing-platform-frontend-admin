import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseModalComponent } from './update-course-modal.component';

describe('UpdateCourseModalComponent', () => {
  let component: UpdateCourseModalComponent;
  let fixture: ComponentFixture<UpdateCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
