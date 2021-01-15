import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Observable } from 'rxjs';
import { BackendService } from './BackendService';
import { Student } from '../model/Student';
import { UploadResponse } from '../model/UploadResponse';


@Injectable({
  providedIn: 'root'
})
export class CandidateUploadService extends BackendService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public sendFormData(formData: FormData):Observable<UploadResponse> {
    return this.httpClient.post<any>(`${this.baseURL}/api/upload`, formData);
}

public getAllStudents():Observable<Student[]>{
  return this.httpClient.get<any>(`${this.baseURL}/api/students`);
}

}
