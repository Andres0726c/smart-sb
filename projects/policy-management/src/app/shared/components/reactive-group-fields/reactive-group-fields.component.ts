import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'smartcore-reactive-group-fields',
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

}
