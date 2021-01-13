import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFeedbackModalComponent } from './view-feedback-modal.component';

describe('ViewFeedbackModalComponent', () => {
  let component: ViewFeedbackModalComponent;
  let fixture: ComponentFixture<ViewFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
