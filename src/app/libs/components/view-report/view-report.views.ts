import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.views.html',
  styles: [],
})
export class ViewReportViews implements OnInit {
  pdfSrc: any;
  base64: any;

  @Input() set setPdf(value: any) {
    this.pdfSrc = value;
    // this.base64 = value;
  }

  ngOnInit(): void {}
}
