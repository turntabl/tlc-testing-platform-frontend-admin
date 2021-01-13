import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, Subscription } from 'rxjs';
import { CandidateUploadService } from 'src/app/services/candidate-upload.service';
import { Exams } from 'src/app/model/Exams';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ExamsService } from 'src/app/services/exams.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  uploadTestID:number;
  files: any[] = [];
  active = 1;
  dropdown = new FormControl();
  test: Exams[]=[];
  testId: number;
  question: string;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  mark: number;
  validAnswer: string;
  subscription: Subscription;
  notEmpty: boolean=false;
  exist: boolean=false;
  success: boolean=false;
  submit: string="Submit";
  user_id: string;
  uploadMessage: string;
  upload: string = "Upload";
  uploadQuestion: boolean=false;
  uploadChanger: string="Upload Questions";


  constructor(private auth: AuthenticateService, private questionServie: QuestionService, private examsService: ExamsService, private uploadService:CandidateUploadService) {}

  ngOnInit(): void {
    this.auth.notLogin();
    this.getAllExams();
     this.subscription = this.dropdown.valueChanges.subscribe(value => {this.testId = value; console.log(value)});
     this.user_id = this.auth.checkLogin();
  }

  addQuestion(){
    console.log("id here", this.testId);
    if (this.testId!=null && this.question!=null && this.option1!=null && this.option2!=null && this.option3!=null && this.option4!=null && this.mark!=null && this.validAnswer!=null) {
      this.submit="Submitting...";
        this.questionServie.addQuestion({
        testId: this.testId,
        question: this.question,
        option:[this.option1, this.option2, this.option3, this.option4],
        user_id: this.user_id,
        validAnswer: this.validAnswer,
        mark_allocated: this.mark
       }).subscribe(result => {
         console.log(result)
          if(JSON.parse(JSON.stringify(result)).message=="Success"){
            this.success=true;
            this.submit="Submit";
            this.question="";
            this.option1="";
            this.option2="";
            this.option3="";
            this.option4="";
            this.validAnswer="";
          }
       });
    }else{
      this.notEmpty=true;
    }
      
  }
  getAllExams(){
    this.examsService.getAllExams().subscribe(result =>{
      this.test = result;
    })
  }
  clear(){
    this.notEmpty=false;
    this.exist=false;
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
    this.upload = "Uploading file...";
    let formData:FormData = new FormData();
    formData.set('file', file);
    formData.set('test_id', this.uploadTestID.toString());
    console.log(formData.get('test_id'));
    console.log(formData.get('file'));
    this.uploadService
      .sendQuestionsFormData(formData)
      .subscribe((event) => {
        if (event!=null) {
          if (event.status_code==200) {
          this.upload = "Upload";
          this.uploadMessage = event.message;
        }else{
          this.upload = "Error";
          this.uploadMessage = event.message;
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
    if((this.uploadTestID !== undefined) && this.uploadTestID > 0){
      this.sendFiles();
      this.files = [];
    }
  }
  changeUpload(){
    if (this.uploadQuestion){
      this.uploadQuestion=false;
      this.uploadChanger="Type Question";
    }else if(!this.uploadQuestion){
      this.uploadQuestion=true;
      this.uploadChanger="Upload Questions";
    }
  }
}
