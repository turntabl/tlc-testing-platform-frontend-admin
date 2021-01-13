import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkExamComponent } from './mark-exam.component';

describe('MarkExamComponent', () => {
  let component: MarkExamComponent;
  let fixture: ComponentFixture<MarkExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkExamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
