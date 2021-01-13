import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetDurationModalComponent } from './set-duration-modal.component';

describe('SetDurationModalComponent', () => {
  let component: SetDurationModalComponent;
  let fixture: ComponentFixture<SetDurationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetDurationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
