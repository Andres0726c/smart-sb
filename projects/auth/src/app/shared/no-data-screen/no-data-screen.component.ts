import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'refactoring-smartcore-mf-no-data-screen',
  templateUrl: './no-data-screen.component.html',
  styleUrls: ['./no-data-screen.component.scss']
})
export class NoDataScreenComponent {

  @Input() emptyTitle:string = '';
  @Input() emptySubTitle:string = '';
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor() { 
    //
  }

  shootAction(){
    this.action.emit()
  }
}
