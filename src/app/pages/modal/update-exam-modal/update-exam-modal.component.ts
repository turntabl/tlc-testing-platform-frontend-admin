import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-update-exam-modal',
  templateUrl: './update-exam-modal.component.html',
  styleUrls: ['./update-exam-modal.component.css']
})
export class UpdateExamModalComponent implements OnInit {
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

  constructor(public activeModal: NgbActiveModal, private examsService: ExamsService) {}

  ngOnInit(): void {
    this.testId = this.examsService.getTestId();
    this.questionType= this.examsService.getQuestionType();
    console.log(this.questionType);
    
    this.examsTitle = this.examsService.getTitle();
    this.examsRule = this.examsService.getRule();
    this.date = JSON.parse(this.examsService.getDate());
    this.timeStart = JSON.parse(this.examsService.getTimeStart());
    this.timeEnd = JSON.parse(this.examsService.getTimeEnd());

    this.courseName = this.examsService.getCourseName();
  }

  updateExam(){
    if (this.examsTitle!="" && this.examsRule!="" && this.examsDate!="" && this.examsTimeStart!="" && this.examsTimeEnd!="") {
    this.update="Updating...";
      this.examsTimeStart=JSON.stringify(this.timeStart);
    this.examsTimeEnd=JSON.stringify(this.timeEnd);
    this.examsDate=JSON.stringify(this.date);
    this.examsService.updateExam({
      questions_type: this.questionType,
      test_date: this.examsDate,
      test_id: this.testId,
      test_title: this.examsTitle,
      test_rule: this.examsRule,
      test_time_start: this.examsTimeStart, 
      test_time_end: this.examsTimeEnd
    }).subscribe(result => {
      this.response = result;
      this.update="Update";
      setTimeout(() => (this.activeModal.dismiss('Cross click')), 1500);
    }, error=>{this.error=true; this.update="Update";});
    }else{
      this.notEmpty = true;
  }
}

onClick(){
  this.notEmpty =false;
  this.error=false;
}

}
