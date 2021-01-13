import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../model/Feedback';
import { BackendService } from './BackendService';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends BackendService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.httpClient.get<any>(`${this.baseURL}/api/feedbacks`);
  }

  deleteFeedbackByID(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/api/delete/feedback/${id}`);
  }
}
