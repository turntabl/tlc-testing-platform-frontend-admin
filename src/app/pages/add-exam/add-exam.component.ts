import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateExamModalComponent } from 'src/app/pages/modal/update-exam-modal/update-exam-modal.component';
import { Exams } from 'src/app/model/Exams';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  allTests: Exams[] = [];
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
    testTimeStart: string,
    testTimeEnd: string,
    courseName: string
  ) {
    const modalRef =  this.modalService.open(UpdateExamModalComponent);
    modalRef.componentInstance.data = {
      questions_type: questionType,
      test_date: testDate,
      test_id: testId,
      test_title: testTitle,
      test_rule: testRule,
      test_time_end: testTimeEnd,
      test_time_start: testTimeStart,
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

  


  getAllTests() {
    this.examsService.getAllExams().subscribe((result) => {
      this.allTests = result;
        this.empty=this.allTests.length;
    });
  }
}
