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

  addQuestion(question: Question){
    return this.http.post(`${this.baseURL}/api/question/add`,question);
  }

}
