import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MarkExamComponent } from './pages/mark-exam/mark-exam.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddExamComponent } from './pages/add-exam/add-exam.component';
import { UploadCandidatesComponent } from './pages/upload-candidates/upload-candidates.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestComponent } from './pages/test/test.component';
import { ViewResultComponent } from './pages/view-result/view-result.component';
import { NotpermittedComponent } from './pages/notpermitted/notpermitted.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadCandidatesComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-question', component: CreateQuestionComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'mark-exam', component: MarkExamComponent, canActivate: [AuthGuard] },
  { path: 'add-course', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'add-exam', component: AddExamComponent , canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'view-result', component: ViewResultComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'notpermitted', component: NotpermittedComponent },
  { path: 'questions', component: QuestionsPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
