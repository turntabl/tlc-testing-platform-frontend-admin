<<<<<<< HEAD
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Exams } from "../model/Exams";
import { ExamsUpdate } from "../model/ExamsUpdate";
import { BackendService } from "./BackendService";
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamRequest } from '../model/ExamRequest';
import { Exams } from '../model/Exams';
import { ExamsUpdate } from '../model/ExamsUpdate';
import { BackendService } from './BackendService';
>>>>>>> master

@Injectable({
  providedIn: "root",
})
export class ExamsService extends BackendService {
  test_id: number;
  question_type: string;
  courseName: string;
  test_title: string;
  test_rule: string;
  test_date: string;
  test_time_start: string;
  test_time_end: string;
  user_id: string;

  constructor(private http: HttpClient) {
    super();
  }

<<<<<<< HEAD
  addExams(exams: Exams) {
    return this.http.post(`${this.baseURL}/api/test/add`, exams);
=======
  addExams(exams: ExamRequest):Observable<Exams> {
    return this.http.post<any>(
      `${this.baseURL}/api/test/add`,
      exams
    );
>>>>>>> master
  }

  getAllExams(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/test/all`);
  }

  deleteExam(test_id:number){
    return this.http.get<any>(`${this.baseURL}/api/test/delete/${test_id}`);
  }

  setUpdateExam(examsUpdate: ExamsUpdate) {
    this.test_id = examsUpdate.test_id;
    this.question_type = examsUpdate.questions_type;
    this.test_title = examsUpdate.test_title;
    this.test_rule = examsUpdate.test_rule;
    this.test_date = examsUpdate.test_date;
    this.test_time_start = examsUpdate.test_time_start;
    this.test_time_end = examsUpdate.test_time_end;
  }
  setTestId(id: number) {
    this.test_id = id;
  }

  getTestId() {
    return this.test_id;
  }
  getQuestionType() {
    return this.question_type;
  }
  getCourseName() {
    return this.courseName;
  }
  getTitle() {
    return this.test_title;
  }
  getRule() {
    return this.test_rule;
  }
  getDate() {
    return this.test_date;
  }
  getTimeStart() {
    return this.test_time_start;
  }
  getTimeEnd() {
    return this.test_time_end;
  }
  getUserId() {
    return this.user_id;
  }

  updateExam(examUpdate: ExamsUpdate): Observable<any> {
    return this.http.post(`${this.baseURL}/api/test/update`, examUpdate);
  }

  deleteTest(test_id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/api/test/delete/${test_id}`);
  }
}
