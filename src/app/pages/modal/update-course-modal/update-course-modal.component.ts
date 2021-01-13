import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-update-course-modal',
  templateUrl: './update-course-modal.component.html',
  styleUrls: ['./update-course-modal.component.css']
})
export class UpdateCourseModalComponent implements OnInit {
  courseId: number;
  courseName: string;
  Update: string="Update";
  notEmpty: boolean=false;
  success: boolean=false;
  error: boolean=false;

  constructor(public activeModal: NgbActiveModal, 
    private courseService: CourseService,
    private router: Router 
    ) {}

  ngOnInit(): void {
    this.courseId = this.courseService.getCourseId();
    this.courseName = this.courseService.getCourseName();
  }

  updateCourse(){
    if (this.courseName=="") {
      this.notEmpty=true;
    }else{
    this.Update="Updating...";
    this.courseService.updateCourse({ courseId: this.courseId, courseName: this.courseName }).subscribe(result =>{
      if(result!=null){
        this.Update="Update";
        this.success =true;
        setTimeout(() => (this.activeModal.dismiss('Cross click')), 1500);
      }
    },error=>{ this.error = true; this.Update="Update"; }
    );}
}
  clear(){
    this.notEmpty=false;
    this.success=false;
    this.error = false;
  }
}