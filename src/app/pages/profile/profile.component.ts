import { Component , OnInit} from "@angular/core";
import { NgxDropzoneImagePreviewComponent } from "ngx-dropzone";
import { AuthenticateService } from "../../services/authenticate.service";

@Component({

    selector: 'profile',
templateUrl: './profile.component.html',
 styleUrls: [ './profile.component.css']

})

export class ProfileComponent implements OnInit{

    collect:any;
    id:any;
    name:any;
    firstname:any;
    lastname:any;
    email:any;
    photo:any;

    constructor(private auth:AuthenticateService){}

     ngOnInit (): void{
         this.auth.notLogin();
        this.check();
     }

     check(){
        if (localStorage.getItem("id")!=null) {
          this.collect = localStorage.getItem("id");
          this.id = JSON.parse(this.collect).user_id;
          this.firstname = JSON.parse(this.collect).first_name;
          this.lastname = JSON.parse(this.collect).last_name;
          this.email = JSON.parse(this.collect).email;
          // this.photo = JSON.parse(this.collect).photoUrl;
          return this.id;
        }
      }
}