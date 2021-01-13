import { Student } from './Student';

export class AddStudentResponse{
    atomicInteger:number;
    studentList:Student[];

    constructor(students:Student[], total:number){
        this.atomicInteger = total;
        this.studentList = students;
    }
}