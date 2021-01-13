import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { BackendService } from './BackendService';
import { CandidateUploadService } from './candidate-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BackendService  {
  total_users:number;

  constructor(private http: HttpClient, private candidateUploadService:CandidateUploadService ) { 
    super();
  }
  
  getUserByEmail(userEmail: string){
    return this.http.get<any>(`${this.baseURL}/api/user-by-email/`+userEmail);
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<any>(`${this.baseURL}/api/users/all`);
  }

  addUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/api/user/add`, user);
  }


  removeUser(user_id:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/api/delete-user/${user_id}`);
  }

}
