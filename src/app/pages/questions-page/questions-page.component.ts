import { Component, OnInit } from '@angular/core';
import { ViewQuestionService } from '../../services/view-question.service';
import { Question } from '../../model/Question';
import { Exams } from 'src/app/model/Exams';
import { ExamsService } from 'src/app/services/exams.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css'],
})
export class QuestionsPageComponent implements OnInit {
  test_id: number;
  test_title: string;
  questions: Question[] = [];
  test: any = [];
  empty: number;
  message:string;
  isSuccess:boolean;
  isError:boolean;

  constructor(
    private viewQuestionService: ViewQuestionService,
    private examsService: ExamsService,
    private questionService:QuestionService
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

  deleteQuestion(question_id:number){
    this.questionService.deleteQuestion(question_id).subscribe((res)=>{
      if(res.message === "success"){
        for (let index = 0; index < this.questions.length; index++) {
          const element = this.questions[index];
          if(element.questionId == question_id){
            this.questions.splice(index,1);
          }
        }
        this.message = "Successfully deleted question";
        this.isSuccess = true;
        setTimeout(() => ( this.isSuccess = false ), 5000);
      }else{
        this.message = "Error deleting question";
        this.isError = true;
        setTimeout(() => ( this.isError = false ), 5000);
      }
    });
  }
}
