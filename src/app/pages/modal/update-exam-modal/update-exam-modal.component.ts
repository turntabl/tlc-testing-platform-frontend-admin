import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-update-exam-modal',
  templateUrl: './update-exam-modal.component.html',
  styleUrls: ['./update-exam-modal.component.css']
})
export class UpdateExamModalComponent implements OnInit {
  @Input() data: any;
  @Output() onExamUpdate = new EventEmitter<any>();
  timeStart: {hour:0, minute:0, second:0};
  timeEnd : {hour:0, minute:0, second:0};
  date: { year:0, month:0, day:0 };
  faCalendar = faCalendar;
  testId: number;
  questionType: string;
  courseName: string;
  examsTitle: string;
  examsRule: string;
  examsDate: string;
  examsTimeStart: string;
  examsTimeEnd: string;
  userId: string;
  model: any;
  notEmpty: boolean = false;
  error: boolean = false;
  update: string = "Update";
  response:any;
  examUpdateForm:FormGroup;

  constructor(public activeModal: NgbActiveModal, private examsService: ExamsService, private form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.examUpdateForm = this.form.group({
      questions_type: [this.data.questions_type],
      test_date:[this.test_date, [Validators.required]],
      test_id:[this.data.test_id],
      test_title:[this.data.test_title, [Validators.required]],
      test_rule:[this.data.test_rule, [Validators.required]],
      test_time_start:[this.test_start, [Validators.required]],
      test_time_end:[this.test_end, [Validators.required]]
    });
  }

  updateExam(){
    this.update="Updating...";
    this.examUpdateForm.get('test_time_start')?.setValue(JSON.stringify(this.examUpdateForm.get('test_time_start')?.value));
    this.examUpdateForm.get('test_time_end')?.setValue(JSON.stringify(this.examUpdateForm.get('test_time_end')?.value));
    this.examUpdateForm.get('test_date')?.setValue(JSON.stringify(this.examUpdateForm.get('test_date')?.value));
    this.examsService.updateExam(this.examUpdateForm.value).subscribe(result => {
      this.response = result;
      if(result.message === "success"){
        this.onExamUpdate.emit(this.examUpdateForm.value);
        this.update="Update";
        setTimeout(() => (this.activeModal.dismiss('Cross click')), 1500);
      }else{
        this.error=true;
        this.update="Update";
      }
    });
}

get test_date(){
  return JSON.parse(this.data.test_date);
}

get test_start(){
  return JSON.parse(this.data.test_time_start);
}

get test_end(){
  return JSON.parse(this.data.test_time_end);
}


onClick(){
  this.notEmpty =false;
  this.error=false;
}

}
