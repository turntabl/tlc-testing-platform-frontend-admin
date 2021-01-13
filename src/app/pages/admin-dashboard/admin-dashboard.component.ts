import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseModalComponent } from '../modal/add-course-modal/add-course-modal.component';
import { AddExamModalComponent } from '../modal/add-exam-modal/add-exam-modal.component';
import { SetInstructionModalComponent } from '../modal/set-instruction-modal/set-instruction-modal.component';
import { SetDurationModalComponent } from '../modal/set-duration-modal/set-duration-modal.component';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { CourseService } from '../../services/course.service';
import { ExamsService } from '../../services/exams.service';
import { UserService } from '../../services/user.service';
import { CandidateUploadService } from '../../services/candidate-upload.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  collect:any;
  users:any;
  role:any;
  name:any;
  numberOfCourses: number = 0;
  numberOfUsers: number = 0;
  numberOfExams: number = 0;

  constructor(public modalService: NgbModal, 
              private router:Router, 
              private auth:AuthenticateService, 
              private courseService: CourseService,
              private candidateUploadService: CandidateUploadService,
              private examsService: ExamsService,
              private userService:UserService
              ) {}

  ngOnInit(): void {
    if (localStorage.getItem("id")!=null) {
      this.collect = localStorage.getItem("id");
      this.name = JSON.parse(this.collect).first_name;
      if(JSON.parse(this.collect).role === 1 ){
        this.role = "SUPER ADMIN";
      }else{
        this.role = "ADMIN";
      }
      this.countCourses();
      this.countCandidates();
      this.countExams();
    }else{
      this.router.navigate(['/login']);
    }
  }

  openCourseModal() {
    this.modalService.open(AddCourseModalComponent);
  }

  openExamModal() {
    this.modalService.open(AddExamModalComponent);
  }

  openInstructionModal() {
    this.modalService.open(SetInstructionModalComponent);
  }

  openDurationModal() {
    this.modalService.open(SetDurationModalComponent);
  }

  countCourses(){
    this.courseService.getAllCourse().subscribe(result=> {
      if (result!=null) {
        this.numberOfCourses = result.length;
      }
    });
  }

  countCandidates(){
    this.candidateUploadService.getAllStudents().subscribe(result=> {
      if (result!=null) {
        this.userService.getAllUsers().subscribe((users)=>{
          this.numberOfUsers = result.length + users.length;
      });
      }
    })
  }
  countExams(){
    this.examsService.getAllExams().subscribe(result=>{
      if(result!=null){
        this.numberOfExams = result.length;
      }
    })
  }
}
