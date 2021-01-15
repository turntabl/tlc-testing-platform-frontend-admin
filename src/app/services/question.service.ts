import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/Question';
import { BackendService } from './BackendService';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BackendService  {

  constructor( private http: HttpClient ) { 
    super();
  }

  addQuestion(question: {}){
    return this.http.post(`${this.baseURL}/api/question/add`,question);
  }

  deleteQuestion(question_id:number):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/api/question/delete/${question_id}`);
  }

}
