import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-set-instruction-modal',
  templateUrl: './set-instruction-modal.component.html',
  styleUrls: ['./set-instruction-modal.component.css'],
})
export class SetInstructionModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
