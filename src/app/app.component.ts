import { Component } from '@angular/core';
import { AuthenticateService } from "./services/authenticate.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddAdminFormComponent } from './pages/modal/add-admin-form/add-admin-form.component';
import { DeleteAdminComponent } from './pages/modal/delete-admin/delete-admin.component';
import { faBook, faCoffee, faCommentDots, faFileAlt, faMarker, faQuestion, faQuestionCircle, faTachometerAlt, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  faTachometerAlt=faTachometerAlt;
  faFileAlt=faFileAlt;
  faBook=faBook;
  faQuestionCircle=faQuestionCircle;
  faCommentDots=faCommentDots;
  faUserGraduate=faUserGraduate;
  faQuestion=faQuestion;
  faMarker=faMarker;
  id: any;
  name: any;
  firstname: any;
  lastname: any;
  email: any;
  photo: any;
  collect:any;
  loggedInUser:any;
  userRole:number;
  isLoggedIn$: Observable<boolean>;
  isSuperAdmin$:Observable<boolean>;
  roll: number;

  constructor(public auth: AuthenticateService, public modalService: NgbModal, private authService:AuthService){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isSuperAdmin$ = this.authService.isSuperAdmin;
  }
  
  signout(): void {
    this.authService.logout();
  }

  check(){
    if (localStorage.getItem("id")!=null) {
      this.collect = localStorage.getItem("id");
      this.id = JSON.parse(this.collect).id;
      this.roll = JSON.parse(this.collect).roll;
      this.firstname = JSON.parse(this.collect).firstName;
      this.lastname = JSON.parse(this.collect).lastName;
      this.email = JSON.parse(this.collect).email;
      this.photo = JSON.parse(this.collect).photoUrl;
      return this.id;
    }
  }

  openAdminFormModal() {
    this.modalService.open(AddAdminFormComponent);
  }

  openDeleteAdminFormModal() {
    this.modalService.open(DeleteAdminComponent);
  }
}
