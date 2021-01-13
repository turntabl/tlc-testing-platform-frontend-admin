import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SendFeedbackComponent } from '../modal/send-feedback/send-feedback.component';

interface Question {
  question: string;
  responsesNum: number;
}

const QUESTIONS: Question[] = [
  {
    question: 'What is the function of the kernel',
    responsesNum: 59,
  },
  {
    question: 'What is a daemon',
    responsesNum: 59,
  },
  {
    question: 'what is DDL',
    responsesNum: 59,
  },
  {
    question: 'What is a swap file',
    responsesNum: 59,
  },
  {
    question: 'List three operating Systems',
    responsesNum: 59,
  },
];
@Component({
  selector: 'app-mark-exam',
  templateUrl: './mark-exam.component.html',
  styleUrls: ['./mark-exam.component.css'],
})
export class MarkExamComponent implements OnInit {
  questions = QUESTIONS;
  active = 1;

  constructor(public modalService: NgbModal, private auth: AuthenticateService) {}

  ngOnInit(): void {
    this.auth.notLogin();
  }

  openSendFeedback() {
    this.modalService.open(SendFeedbackComponent);
  }
}
