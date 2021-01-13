import { AddStudentResponse } from './AddStudentResponse';

export class UploadResponse{
    message: string;
    status_code:number;
    addStudentSaveResponse:AddStudentResponse;

    constructor(message:string, status_code:number, addStudentSaveResponse:AddStudentResponse) {
        this.message = message;
        this.status_code = status_code;
        this.addStudentSaveResponse = addStudentSaveResponse
      }
}

