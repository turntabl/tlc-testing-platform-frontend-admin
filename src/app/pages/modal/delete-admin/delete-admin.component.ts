import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css']
})
export class DeleteAdminComponent implements OnInit {
  users:any;
  message:string;
  isSuccess:boolean=false;
  isError:boolean=false;


  constructor(public activeModal: NgbActiveModal, private userService:UserService) { }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((users)=>{
      console.log(users);
        this.users = users;
    });
  }

  removeUser(user_id:string){
    this.userService.removeUser(user_id).subscribe((res)=>{
        if(res.message === "success"){
          for (let index = 0; index < this.users.length; index++) {
            const element = this.users[index];
            if(element.user_id == user_id){
              this.users.splice(index,1);
            }
          }
          this.message = "Successfully deleted user";
          this.isSuccess = true;
          setTimeout(() => ( this.isSuccess = true ), 5000);
          setTimeout(() => ( this.activeModal.dismiss('Cross click')), 5000);
        }else{
          this.message = "Error deleting user";
          this.isError = true;
          setTimeout(() => ( this.isError = true ), 5000);
        }
    })
  }

}
