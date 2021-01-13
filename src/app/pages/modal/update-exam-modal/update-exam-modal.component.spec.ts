import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExamModalComponent } from './update-exam-modal.component';

describe('UpdateExamModalComponent', () => {
  let component: UpdateExamModalComponent;
  let fixture: ComponentFixture<UpdateExamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExamModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
