import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.css']
})
export class AddAdminFormComponent implements OnInit {
  userRole:string;
  public userForm: FormGroup;
  isEmpty:boolean=false;
  message:string;
  isSuccess:boolean=false;
  constructor(public activeModal: NgbActiveModal, private userService:UserService,  private form: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

     buildForm() {
      this.userForm = this.form.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role:['']
      });
}


onSubmit() {
  this.userForm.controls['role'].setValue(Number(this.userRole));
  if(!this.userForm.get('role')?.value || !this.userForm.get('first_name')?.value || !this.userForm.get('last_name')?.value || !this.userForm.get('email')?.value){
    this.message = "All fields are required."
    this.isEmpty = true;
    setTimeout(() => (this.isEmpty = false), 10000);
  }else{
    this.userService.addUser(this.userForm.value).subscribe((res)=>{
      this.message = `Successfully Added User`;
      this.isSuccess = true;
      this.userForm.reset();
      setTimeout(() => (this.isEmpty = false), 5000);
      setTimeout(() => (this.activeModal.dismiss('Cross click')), 5000);
    })
    
  }
}



}
