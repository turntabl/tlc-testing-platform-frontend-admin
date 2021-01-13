import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exams } from 'src/app/model/Exams';
import { ExamsService } from 'src/app/services/exams.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  exams: Exams[] = [];
  empty: number;

  constructor(private examsService: ExamsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllExams();
  }

  getAllExams() {
    this.examsService.getAllExams().subscribe((result) => {
      this.exams = result;
      this.empty = this.exams.length;
    });
  }
  viewResults(testId: number) {
    this.examsService.setTestId(testId);
    this.router.navigate(['view-result']);
  }
}
