import { AddStudentResponse } from './AddStudentResponse';

export class UploadResponse{
    message: string;
    status_code:number;
    t:AddStudentResponse;
    
    constructor(message:string, status_code:number, addStudentSaveResponse:AddStudentResponse) {
        this.message = message;
        this.status_code = status_code;
        this.t = addStudentSaveResponse
      }
}

