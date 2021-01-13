import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from './BackendService';

@Injectable({
  providedIn: 'root'
})
export class ResultsService extends BackendService  {

  constructor(private http: HttpClient) { 
    super();
  }

  getAllResultsByTestId(testId: number){
    return this.http.get<any>(`${this.baseURL}/api/results-test/`+testId);
  }
}
