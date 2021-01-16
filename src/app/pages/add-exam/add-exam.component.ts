<<<<<<< HEAD
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UpdateExamModalComponent } from "src/app/pages/modal/update-exam-modal/update-exam-modal.component";
import { Exams } from "src/app/model/Exams";
import { ExamsUpdate } from "src/app/model/ExamsUpdate";

import { AuthenticateService } from "src/app/services/authenticate.service";
import { ExamsService } from "src/app/services/exams.service";
=======
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateExamModalComponent } from 'src/app/pages/modal/update-exam-modal/update-exam-modal.component';
import { Exams } from 'src/app/model/Exams';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ExamsService } from 'src/app/services/exams.service';
import { AddExamModalComponent } from '../modal/add-exam-modal/add-exam-modal.component';
>>>>>>> master

@Component({
  selector: "app-add-exam",
  templateUrl: "./add-exam.component.html",
  styleUrls: ["./add-exam.component.css"],
})
export class AddExamComponent implements OnInit {
  allTests: Exams[] = [];
  userId!: string;
  empty: number;
<<<<<<< HEAD
  message: string;
  isSuccess: boolean;
  isError: boolean;
=======
  message:string;
  isSuccess:boolean;
  isError:boolean;
>>>>>>> master

  constructor(
    private auth: AuthenticateService,
    public modalService: NgbModal,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.auth.notLogin();
    this.getAllTests();
    this.userId = this.auth.checkLogin();
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
    const modalRef = this.modalService.open(UpdateExamModalComponent);
    modalRef.componentInstance.data = {
      questions_type: questionType,
      test_date: testDate,
      test_id: testId,
      test_title: testTitle,
      test_rule: testRule,
<<<<<<< HEAD
      test_time_end: testTimeEnd,
      test_time_start: testTimeStart,
      course_name: courseName,
    };
    modalRef.componentInstance.onExamUpdate.subscribe(
      (data: { test_id: number; test_title: string }) => {
        for (let index = 0; index < this.allTests.length; index++) {
          const element = this.allTests[index];
          if (element.test_id === data.test_id) {
            element.test_title = data.test_title;
          }
=======
      test_time_end:testTimeEnd,
      test_time_start:testTimeStart,
      course_name: courseName
    };
    modalRef.componentInstance.onExamUpdate.subscribe((data: { test_id: number; test_title:string; test_time_start:string;test_time_end:string;test_date:string;test_rule:string})=> {
      for (let index = 0; index < this.allTests.length; index++) {
        const element = this.allTests[index];
        if(element.test_id === data.test_id){
          element.test_title = data.test_title;
          element.test_date = data.test_date;
          element.test_rule = data.test_rule;
          element.test_time_start = data.test_time_start;
          element.test_time_end = data.test_time_end;
>>>>>>> master
        }
      }
    );
  }

<<<<<<< HEAD
=======
  openExamModal() {
    const modalRef = this.modalService.open(AddExamModalComponent);
    modalRef.componentInstance.onExamAdd.subscribe((data:Exams)=> {
      if(data!==null){
          this.allTests.push(data);
      }
  });
  }

  deleteTest(test_id:number){
    this.examsService.deleteExam(test_id).subscribe((result) => {
      if(result.message === "success"){
        for (let index = 0; index < this.allTests.length; index++) {
          const element = this.allTests[index];
          if(element.test_id == test_id){
            this.allTests.splice(index,1);
          }
        }
        this.message = "Successfully deleted test";
        this.isSuccess = true;
        setTimeout(() => ( this.isSuccess = false ), 5000);
      }else{
        this.message = "Error deleting test";
        this.isError = true;
        setTimeout(() => ( this.isError = false ), 5000);
      }
    });
  }

>>>>>>> master
  getAllTests() {
    this.examsService.getAllExams().subscribe((result) => {
      this.allTests = result;
      this.empty = this.allTests.length;
    });
  }

  deleteTest(test_id: number) {
    this.examsService.deleteTest(test_id).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
