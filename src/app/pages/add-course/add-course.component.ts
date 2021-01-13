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

  constructor(private auth:AuthenticateService, public modalService: NgbModal, private courseService: CourseService) {}

  ngOnInit(): void {
   this.auth.notLogin();
   this.getAllCourse();
  }

  openUpdateCourseModal(id: number, name:string) {
    this.modalService.open(UpdateCourseModalComponent);
    this.courseService.getUpdate({courseId: id, courseName: name});
  }

  getAllCourse(){
    this.courseService.getAllCourse().subscribe(result =>{
      this.courses=result;
      this.empty=this.courses.length;
    });
  }

  deleteCourse(courseId: number){
    this.courseService.deleteCourse(courseId).subscribe(result =>{
      console.log(result);
    });
  }
}
