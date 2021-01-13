import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-set-duration-modal',
  templateUrl: './set-duration-modal.component.html',
  styleUrls: ['./set-duration-modal.component.css'],
})
export class SetDurationModalComponent implements OnInit {
  model: any;
  faCalendar = faCalendar;
  time = { hour: 13, minute: 30 };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
