import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';

@Component({
  selector: 'app-no-data-screen',
  templateUrl: './no-data-screen.component.html',
  styleUrls: ['./no-data-screen.component.scss']
})
export class NoDataScreenComponent {

  @Output() action: EventEmitter<ElementTableSearch> = new EventEmitter();

  @Input() data: any = new FormArray([new FormControl('data')]);
  @Input() layoutType: string = 'child';
  @Input() emptyTitle:string = '';
  @Input() emptySubTitle:string = '';
  @Input() emptyText:string = '';
  @Input() emptySubText:string = '';
  @Input() ShowButton:boolean = true;

  get serviceDataControls(): FormArray {
    return this.data as FormArray;
  }

  /**
   * Función para emitir el evento
   */
  shootAction(){
    this.action.emit()
  }

}
