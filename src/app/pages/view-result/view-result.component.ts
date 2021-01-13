import { Component, OnInit } from '@angular/core';
import { ExamsService } from 'src/app/services/exams.service';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  results: string[] = [];
  testId: number;
  empty: number;
  error: boolean=false;

  constructor(private examsService: ExamsService, private resultsService: ResultsService) {}
  ngOnInit(): void {
   this.testId = this.examsService.getTestId();
   this.fetchResults();
  }

  fetchResults(){
    this.resultsService.getAllResultsByTestId(this.testId).subscribe(result =>{
      this.results = result;
      this.empty = this.results.length;
    }, error=>{ this.error=true });
  }

}
