import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ViewFeedbackModalComponent } from '../modal/view-feedback-modal/view-feedback-modal.component';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/Feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  message:string="";
  isError:boolean=false;
  isSuccess:boolean=false;
  feedback: Feedback;
  singleFeedback: Feedback[] = [];
  feedbacks: Feedback[] = [];
  constructor(
    public modalService: NgbModal,
    private auth: AuthenticateService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.auth.notLogin();
    this.getFeedbacks();
  }

  openViewFeedback(feedback: Feedback) {
    if (this.singleFeedback.length > 0) {
      this.singleFeedback = [];
    }
    this.singleFeedback.push(feedback);
    const modalRef = this.modalService.open(ViewFeedbackModalComponent);
    modalRef.componentInstance.data = this.singleFeedback;
  }

  deleteFeedback(id:number){
    this.feedbackService.deleteFeedbackByID(id).subscribe((res)=>{
        if(res.message === "success"){
          this.isSuccess = true;
          for (let index = 0; index < this.feedbacks.length; index++) {
            const element = this.feedbacks[index];
            if(element.id == id){
              this.feedbacks.splice(index,1);
            }
          }
          this.message = res.message;
          setTimeout(() => (this.isSuccess = false), 10000);
        }else{
          this.isError = true;
          this.message = res.message;
          setTimeout(() => (this.isError = false), 10000);
        }
    });
  }

  getFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe((response) => {
      this.feedbacks = response;
    });
  }
}
