import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';

@Component({
  selector: 'smartcore-reactive-group-fields',
  templateUrl: './reactive-group-fields.component.html',
  styleUrls: ['./reactive-group-fields.component.scss']
})
export class ReactiveGroupFieldsComponent {
  @Input() group: any = new FormGroup({});
  @Input() policy: any;
  @Output() updatePolicy: EventEmitter<any> = new EventEmitter();

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  executeRule(field:any) {
    this.updatePolicy.emit();

   
    console.log(this.policy);
  }

  

}
