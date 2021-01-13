import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetInstructionModalComponent } from './set-instruction-modal.component';

describe('SetInstructionModalComponent', () => {
  let component: SetInstructionModalComponent;
  let fixture: ComponentFixture<SetInstructionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetInstructionModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInstructionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
