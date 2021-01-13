export class Student{

    student_id:string;
    first_name:string;
    last_name:string;
    email:string;
    time_created: string;
    time_updated: string;

    constructor(student_id:string, first_name:string, last_name:string, email:string, time_created:string, time_updated:string){
        this.student_id = student_id;
        this.first_name = first_name;
        this.last_name =last_name;
        this.email = email;
        this.time_created = time_created;
        this.time_updated = time_updated;
    }


    

}