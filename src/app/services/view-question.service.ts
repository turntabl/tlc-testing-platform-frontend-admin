import { Injectable } from '@angular/core';
import { BackendService } from './BackendService';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Question } from '../model/Question';

@Injectable({
  providedIn: 'root',
})
export class ViewQuestionService extends BackendService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getQuestionByTestId(test_id: number): Observable<Question[]> {
    return this.httpClient.get<any>(`${this.baseURL}/api/question/${test_id}`);
  }
}
