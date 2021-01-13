import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Feedback } from '../../../model/Feedback';

@Component({
  selector: 'app-view-feedback-modal',
  templateUrl: './view-feedback-modal.component.html',
  styleUrls: ['./view-feedback-modal.component.css'],
})
export class ViewFeedbackModalComponent implements OnInit {
  @Input() data:Feedback[];
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
}
