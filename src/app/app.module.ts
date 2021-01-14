import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddCourseModalComponent } from './pages/modal/add-course-modal/add-course-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExamModalComponent } from './pages/modal/add-exam-modal/add-exam-modal.component';
import { SetInstructionModalComponent } from './pages/modal/set-instruction-modal/set-instruction-modal.component';
import { SetDurationModalComponent } from './pages/modal/set-duration-modal/set-duration-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MarkExamComponent } from './pages/mark-exam/mark-exam.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddExamComponent } from './pages/add-exam/add-exam.component';
import { SendFeedbackComponent } from './pages/modal/send-feedback/send-feedback.component';
import { ViewFeedbackModalComponent } from './pages/modal/view-feedback-modal/view-feedback-modal.component';
import { AngularMaterialModule } from './angular-material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadCandidatesComponent } from './pages/upload-candidates/upload-candidates.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticateService } from './services/authenticate.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateCourseModalComponent } from './pages/modal/update-course-modal/update-course-modal.component';
import { UpdateExamModalComponent } from './pages/modal/update-exam-modal/update-exam-modal.component';
import { TestComponent } from './pages/test/test.component';
import { ViewResultComponent } from './pages/view-result/view-result.component';
import { NotpermittedComponent } from './pages/notpermitted/notpermitted.component';
import { AddAdminFormComponent } from './pages/modal/add-admin-form/add-admin-form.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { DeleteAdminComponent } from './pages/modal/delete-admin/delete-admin.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    PageNotFoundComponent,
    AddCourseModalComponent,
    AddExamModalComponent,
    SetInstructionModalComponent,
    SetDurationModalComponent,
    CreateQuestionComponent,
    FeedbackComponent,
    MarkExamComponent,
    AddCourseComponent,
    AddExamComponent,
    SendFeedbackComponent,
    ViewFeedbackModalComponent,
    UploadCandidatesComponent,
    LoginComponent,
    UploadCandidatesComponent,
    ProfileComponent,
    UpdateCourseModalComponent,
    UpdateExamModalComponent,
    TestComponent,
    ViewResultComponent,
    NotpermittedComponent,
    AddAdminFormComponent,
    QuestionsPageComponent,
    DeleteAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AngularMaterialModule,
    NgxDropzoneModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
  ],

  entryComponents: [
    AddCourseModalComponent,
    AddExamModalComponent,
    SetInstructionModalComponent,
    SetDurationModalComponent,
    SendFeedbackComponent,
    ViewFeedbackModalComponent,
    UpdateCourseModalComponent,
    UpdateExamModalComponent,
    AddAdminFormComponent,
    DeleteAdminComponent
  ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '979127420535-m8uqm92aa4qa7flbum8drmc1gfejb9s3.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    AuthenticateService,
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
