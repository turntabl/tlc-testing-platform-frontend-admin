import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateExamModalComponent } from 'src/app/pages/modal/update-exam-modal/update-exam-modal.component';
import { Exams } from 'src/app/model/Exams';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ExamsService } from 'src/app/services/exams.service';
import { AddExamModalComponent } from '../modal/add-exam-modal/add-exam-modal.component';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  allTests: any;
  userId!: string;
  empty: number;

  constructor(
    private auth: AuthenticateService,
    public modalService: NgbModal,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.auth.notLogin();
    this.getAllTests();
    this.userId=this.auth.checkLogin();
  }

  openUpdateExamModal(
    questionType: string,
    testDate: string,
    testId: number,
    testTitle: string,
    testRule: string,
    testTimeEnd: string,
    testTimeStart: string,
    courseName: string
  ) {
    const modalRef =  this.modalService.open(UpdateExamModalComponent);
    modalRef.componentInstance.data = {
      questions_type: questionType,
      test_date: testDate,
      test_id: testId,
      test_title: testTitle,
      test_rule: testRule,
      test_time_end:testTimeEnd,
      test_time_start:testTimeStart,
      course_name: courseName
    };
    modalRef.componentInstance.onExamUpdate.subscribe((data: { test_id: number; test_title:string;})=> {
      for (let index = 0; index < this.allTests.length; index++) {
        const element = this.allTests[index];
        if(element.test_id === data.test_id){
          element.test_title = data.test_title;
        }
      }
    });
 
  }

  openExamModal() {
    const modalRef = this.modalService.open(AddExamModalComponent);
    modalRef.componentInstance.onExamAdd.subscribe((data:{test_id:number, course_id:number, course_name:string, questions_type:string,test_title:string,test_rule:string,test_date:string,test_time_start:string,test_time_end:string,user_id:string})=> {
      if(data!==null){
          this.allTests.push(data);
      }
  });
  }

  getAllTests() {
    this.examsService.getAllExams().subscribe((result) => {
      this.allTests = result;
        this.empty=this.allTests.length;
    });
  }
}
