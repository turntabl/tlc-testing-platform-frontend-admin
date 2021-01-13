import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../model/Course';
import { catchError } from 'rxjs/operators';
import { CourseUpdate } from '../model/CourseUpdate';
import { BackendService } from './BackendService';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BackendService {
  courseId: number;
  courseName: string;

  constructor(private http: HttpClient) { 
    super();
  }

  addCourse(course: Course){
    return this.http.post(`${this.baseURL}/api/course/add`,course);
  }

  getAllCourse():Observable<CourseUpdate[]>{
    return this.http.get<any>(`${this.baseURL}/api/courses/get`);
  }

  updateCourse(courseUpdate: CourseUpdate){
    return this.http.post(`${this.baseURL}/api/course/update`,courseUpdate);
  }

  deleteCourse(courseDelete: number):Observable<any>{
    return this.http.get(`${this.baseURL}/api/course/delete/${courseDelete}`);
  }
}
