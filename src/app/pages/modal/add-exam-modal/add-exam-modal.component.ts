import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamsService } from 'src/app/services/exams.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { CourseUpdate } from 'src/app/model/CourseUpdate';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam-modal',
  templateUrl: './add-exam-modal.component.html',
  styleUrls: ['./add-exam-modal.component.css'],
})
export class AddExamModalComponent implements OnInit {
  @Output() onExamAdd = new EventEmitter<any>();
  timeStart: {hour: number, minute: number, second: number};
  timeEnd : {hour: number, minute: number, second: number};
  date: { year: number, month: number, day: number};
  faCalendar = faCalendar;
  courseId: number;
  examsTitle: string;
  examsRule: string;
  examsDate: string;
  examsTimeStart: string;
  examsTimeEnd: string;
  model: any;
  dropdown = new FormControl();
  subscription: Subscription;
  course: CourseUpdate[] = [];
  examsType: string;
  notEmpty: boolean=false;
  exist: boolean=false;
  success: boolean=false;
  add: string = "Add";
  user_id: string;
  
  constructor(
    public activeModal: NgbActiveModal, 
    private examsService: ExamsService,
    private courseService: CourseService,
    private authService: AuthenticateService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.user_id = this.authService.checkLogin();
    this.courseService.getAllCourse().subscribe(result=>this.course=result);
    this.subscription = this.dropdown.valueChanges.subscribe(value => { this.courseId = value; });
  }

  addExam(){
    if (this.courseId!=null && this.examsTitle!=null && this.examsType!=null && this.examsRule!=null && this.date!=null && this.timeStart!=null && this.timeEnd!=null && this.courseId!=0) {
    this.add = "Adding...";
    this.examsTimeStart=JSON.stringify({hour: this.timeStart.hour, minute: this.timeStart.minute});
    this.examsTimeEnd=JSON.stringify({hour: this.timeEnd.hour, minute: this.timeEnd.minute});
    this.examsDate=JSON.stringify(this.date);
    this.examsService.addExams({ 
        course_id: this.courseId, 
        test_title: this.examsTitle,
        questions_type: this.examsType, 
        test_rule: this.examsRule, 
        test_date: this.examsDate, 
        test_time_start: this.examsTimeStart, 
        test_time_end: this.examsTimeEnd,
        user_id: this.user_id })
      .subscribe(result => {
        if (result.message=="success") {
          this.onExamAdd.emit(result);
          this.add = "Add";
          this.success=true;
          setTimeout(() => ( this.activeModal.dismiss('Cross click')), 1500);
        }else if (result.message=="duplicate") {
          this.onExamAdd.emit(null);
          this.add = "Add";
          this.exist=true;
        }
      });
    }else{
      this.notEmpty=true;
    }
  }
  clear(){
    this.notEmpty=false;
    this.exist=false;
  }
}
