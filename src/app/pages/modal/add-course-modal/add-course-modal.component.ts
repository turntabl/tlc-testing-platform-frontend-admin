import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/model/Course';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css'],
})
export class AddCourseModalComponent implements OnInit {
  @Output() onCourseAdd = new EventEmitter<any>();
  addcourse: string;
  user_id: string;
  notEmpty: boolean=false;
  success: boolean=false;
  exist: boolean=false;
  add: string = "Add";
  collect: any;
  error: boolean=false;

  constructor(public activeModal: NgbActiveModal, 
              private courseService: CourseService,
              private router: Router,
              private authService: AuthenticateService 
              ) {}

  ngOnInit(): void {
    this.user_id = this.authService.checkLogin();
  }

  addCourse(){
    if (this.addcourse!=null) {
      this.add = "Adding...";
      this.courseService.addCourse({courseName: this.addcourse, user_id: this.user_id}).subscribe(response=>{
        if(JSON.parse(JSON.stringify(response)).message=="success"){
          this.onCourseAdd.emit(true);
          this.add = "Add";
          this.success=true;
          setTimeout(() => (this.activeModal.dismiss('Cross click')), 1500);
        }else if(JSON.parse(JSON.stringify(response)).message=="duplicate course name"){
          this.onCourseAdd.emit(false);
          this.add = "Add";
          this.exist=true;
        }
      }, error=>{this.error=true; this.add = "Add"});
    }else{
      this.notEmpty=true;
    }
  }
  clear(){
    this.notEmpty=false;
    this.exist=false;
    this.error=false;
  }

}
