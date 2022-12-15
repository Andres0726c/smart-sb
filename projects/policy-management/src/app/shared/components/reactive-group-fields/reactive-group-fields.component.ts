import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'smartcore-reactive-group-fields',
  templateUrl: './reactive-group-fields.component.html',
  styleUrls: ['./reactive-group-fields.component.scss']
})
export class ReactiveGroupFieldsComponent {
  @Input() group: any = new FormGroup({});
  @Input() policy: any;

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  executeRule(flag:boolean,field:any) {
  console.log("Entra rule", flag);
    console.log(field.value);
    console.log("this.policy");
    console.log(this.policy);
  }

}
