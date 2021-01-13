import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-notpermitted',
  templateUrl: './notpermitted.component.html',
  styleUrls: ['./notpermitted.component.css']
})
export class NotpermittedComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticateService) { }

  ngOnInit(): void {}

  backToLogin(){
    this.authService.signout();
    this.router.navigate(['/login']);
  }
}
