import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateUploadService } from '../../services/candidate-upload.service';
import { Student } from '../../model/Student';
import { UploadResponse } from '../../model/UploadResponse';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload-candidates',
  templateUrl: './upload-candidates.component.html',
  styleUrls: ['./upload-candidates.component.css'],
})
export class UploadCandidatesComponent implements OnInit, AfterViewInit {
  @Input() userAdded: any;
  users:any;
  allUsers:any;
  public dataSource = new MatTableDataSource<Student>();
  columnsToDisplay = ['first_name', 'last_name', 'email', 'role'];
  students:any;
  total_candidates: number = 0;
  total_users:number = 0;
  files: any[] = [];
  errorIsShown: boolean = false;
  successIsShown: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  uploadUsers: boolean=false;
  uploadChanger: string="Upload Users";
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(private uploadService: CandidateUploadService, private auth: AuthenticateService, private userService:UserService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.auth.notLogin();
    this.getAllUsers();
    this.uploadService.getAllStudents().subscribe((data: Student[]) => {
      if (data) {
      this.total_candidates = data.length;
      let combOfAllUsers = data.concat(this.users);
      this.dataSource.data = combOfAllUsers as any;
    }
    });
  }

  onSelect(event: { addedFiles: any }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  sendFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.uploadService
      .sendFormData(formData)
      .subscribe((event: UploadResponse) => {
        if (typeof event === 'object') {
          console.log(event.message);
          if (event.status_code === 200) {
            console.log(event);
            console.log(event.addStudentSaveResponse.atomicInteger);
            console.log(event.addStudentSaveResponse.studentList.length);
            this.total_candidates += event.addStudentSaveResponse.atomicInteger;
            this.students = this.students.concat(
              event.addStudentSaveResponse.studentList
            );
            this.successMessage = event.message;
            this.successIsShown = true;
            setTimeout(() => (this.successIsShown = false), 10000);
          } else if (event.status_code === 203) {
            this.errorMessage = event.message;
            this.errorIsShown = true;
            setTimeout(() => (this.errorIsShown = false), 10000);
          }
        }
      });
  }
  private sendFiles() {
    this.files.forEach((file) => {
      this.sendFile(file);
    });
  }
  onClick() {
    this.sendFiles();
    this.files = [];
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((users)=>{
        this.users = users;
        this.total_users += users.length;
    });
  }

  changeUpload(){
    if (this.uploadUsers){
      this.uploadUsers=false;
      this.uploadChanger="Upload Users";
      this.getAllUsers();
    }else if(!this.uploadUsers){
      this.uploadUsers=true;
      this.uploadChanger="Done";
    }
  }
}
