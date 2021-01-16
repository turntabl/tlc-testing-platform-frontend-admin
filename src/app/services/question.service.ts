import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/Question';
import { UploadResponse } from '../model/UploadResponse';
import { BackendService } from './BackendService';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BackendService  {

  constructor( private http: HttpClient ) { 
    super();
  }

  addQuestion(question: {}):Observable<any>{
    return this.http.post(`${this.baseURL}/api/question/add`,question);
  }

  addEQuestion(question: {}):Observable<any>{
    return this.http.post(`${this.baseURL}/api/question/essay/add`,question);
  }

  addCSQuestion(question: {}):Observable<any>{
    return this.http.post(`${this.baseURL}/api/question/code-snippet/add`,question);
  }

  deleteQuestion(question_id:number):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/api/question/delete/${question_id}`);
  }

  public sendCSFormData(formData: FormData):Observable<UploadResponse> {
    return this.http.post<any>(`${this.baseURL}/api/questions/code-snippet/upload`, formData);
  }
  
  public sendEFormData(formData: FormData):Observable<UploadResponse> {
    return this.http.post<any>(`${this.baseURL}/api/questions/essay/upload`, formData);
  }

  public sendQuestionsFormData(formData: FormData):Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/questions/upload`, formData);
  }
  
}
