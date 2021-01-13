import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCourseModalComponent } from 'src/app/pages/modal/update-course-modal/update-course-modal.component';
import { CourseUpdate } from 'src/app/model/CourseUpdate';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  courses: CourseUpdate[]=[];
  empty: number;
  message:string;
  isSuccess:boolean;
  isError:boolean;

  constructor(private auth:AuthenticateService, public modalService: NgbModal, private courseService: CourseService) {}

  ngOnInit(): void {
   this.auth.notLogin();
   this.getAllCourse();
  }

  openUpdateCourseModal(id: number, name:string) {
    const modalRef =  this.modalService.open(UpdateCourseModalComponent);
    modalRef.componentInstance.data = {courseId: id, courseName: name};
    modalRef.componentInstance.onCourseUpdate.subscribe((data: { courseId: number; courseName:string;})=> {
      for (let index = 0; index < this.courses.length; index++) {
        const element = this.courses[index];
        if(element.courseId === data.courseId){
          element.courseName = data.courseName;
        }
      }
    });
  }

  getAllCourse(){
    this.courseService.getAllCourse().subscribe(result =>{
      this.courses=result;
      this.empty=this.courses.length;
    });
  }

  deleteCourse(courseId: number){
    this.courseService.deleteCourse(courseId).subscribe(result =>{
      if(result.message === "success"){
        for (let index = 0; index < this.courses.length; index++) {
          const element = this.courses[index];
          if(element.courseId == courseId){
            this.courses.splice(index,1);
          }
        }
        this.message = "Successfully deleted course";
        this.isSuccess = true;
        setTimeout(() => ( this.isSuccess = false ), 5000);
      }else{
        this.message = "Error deleting Course";
        this.isError = true;
        setTimeout(() => ( this.isError = false ), 5000);
      }
    },

    error => {
      this.message = "Error : There is/are test(s) and questions associated with this course.";
      this.isError = true;
      setTimeout(() => ( this.isError = false ), 5000);
    }
    
    );
  }
}
