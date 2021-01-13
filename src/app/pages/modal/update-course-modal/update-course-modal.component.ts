import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-update-course-modal',
  templateUrl: './update-course-modal.component.html',
  styleUrls: ['./update-course-modal.component.css']
})
export class UpdateCourseModalComponent implements OnInit {
  @Input() data:any; 
  @Output() onCourseUpdate = new EventEmitter<any>();
  Update: string="Update";
  notEmpty: boolean=false;
  success: boolean=false;
  error: boolean=false;
  courseUpdateForm:FormGroup;

  constructor(public activeModal: NgbActiveModal, 
    private courseService: CourseService,
    private router: Router,
    private form: FormBuilder
    ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.courseUpdateForm = this.form.group({
      courseName: ['', [Validators.required]],
      courseId:['']
    });
  }

  updateCourse(){
    if (this.courseUpdateForm.get('courseName')?.value =="") {
      this.notEmpty=true;
    }else{
    this.Update="Updating...";
    this.courseUpdateForm.get('courseId')?.setValue(this.data.courseId);
    this.courseService.updateCourse(this.courseUpdateForm.value).subscribe(result =>{
      if(result!=null){
        this.Update="Update";
        this.onCourseUpdate.emit(this.courseUpdateForm.value);
        this.success =true;
        setTimeout(() => (this.activeModal.dismiss()), 1500);
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