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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  @Input() userAdded: any;
  users:any;
  allUsers:any;
  public dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['first_name', 'last_name', 'email', 'role'];
  students:any = [];
  total_candidates: number = 0;
  total_users:number = 0;
  files: any[] = [];
  errorIsShown: boolean = false;
  successIsShown: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  uploadUsers: boolean=false;
  uploadChanger: string="Upload Users";


  constructor(private uploadService: CandidateUploadService, private auth: AuthenticateService, private userService:UserService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.auth.notLogin();
    this.getAllUsers();

  }

  onSelect(event:any) {
    if(this.files.length>0){
      this.files.splice(0,1);
    }
    let files = event.target.files;
    let file = files[0];
    this.files.push(file);
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  sendFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.uploadService
      .sendFormData(formData)
      .subscribe((event: UploadResponse) => {
        if (typeof event === 'object') {
          if (event.status_code === 200) {
            this.total_candidates += event.t.atomicInteger;
            let combOfAllUsers = event.t.studentList.concat(this.users);
            this.dataSource.data = combOfAllUsers;
            this.successMessage = event.message;
            this.successIsShown = true;
            this.myInputVariable.nativeElement.value = "";
            setTimeout(() => (this.successIsShown = false), 10000);
          } else if (event.status_code === 203) {
            this.errorMessage = event.message;
            this.errorIsShown = true;
            this.myInputVariable.nativeElement.value = "";
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
    },
    (error)=>{

    },
    ()=>{
      this.uploadService.getAllStudents().subscribe((data: Student[]) => {
        if (data) {
        this.total_candidates = data.length;
        let combOfAllUsers = data.concat(this.users);
        this.dataSource.data = combOfAllUsers as any;
      }})
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

  get numberOfUsers(){
    return this.userService.total_users;
 }
}
