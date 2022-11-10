import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'refactoring-smartcore-mf-reactive-group-fields',
  templateUrl: './reactive-group-fields.component.html',
  styleUrls: ['./reactive-group-fields.component.scss']
})
export class ReactiveGroupFieldsComponent implements OnInit {
  @Input() group: any = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  getFieldTypeGui(field: any): string {
    return field.value.dataTypeGui || 'Text box';
  }

}
