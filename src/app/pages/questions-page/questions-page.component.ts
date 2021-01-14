import { Component, OnInit } from '@angular/core';
import { ViewQuestionService } from '../../services/view-question.service';
import { Question } from '../../model/Question';
import { Exams } from 'src/app/model/Exams';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css'],
})
export class QuestionsPageComponent implements OnInit {
  test_id: number;
  test_title: string;
  questions: Question[] = [];
  test: any;
  empty: number;

  constructor(
    private viewQuestionService: ViewQuestionService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.getAllExams();
  }

  getAllExams() {
    this.examsService.getAllExams().subscribe((result) => {
      this.test = result;
    });
  }

  getQuestion(test_id: number, test_title:string) {
      this.viewQuestionService
        .getQuestionByTestId(test_id)
        .subscribe((response) => {
          this.questions = response;
          this.test_title = test_title;
          this.empty=this.questions.length;
        });
  }
}
