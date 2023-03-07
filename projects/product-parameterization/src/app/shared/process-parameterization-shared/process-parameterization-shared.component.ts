import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'refactoring-smartcore-mf-process-parameterization-shared',
  templateUrl: './process-parameterization-shared.component.html',
  styleUrls: ['./process-parameterization-shared.component.scss']
})
export class ProcessParameterizationSharedComponent implements OnInit {

  @Input() header1!:string;
  @Input() header2!:string;
  @Input() header3!:string;
  @Input() serviceCause!:string;

  dataSource:[] = [];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.header1);
    
  }

}
