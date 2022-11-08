import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-modify-tabs-data',
  templateUrl: './modify-tabs-data.component.html',
  styleUrls: ['./modify-tabs-data.component.scss']
})
export class ModifyTabsDataComponent implements OnInit {

  @Input() modifyData: any; //= new FormArray([], [Validators.required]);
  Fields: any;

    items!: any;
    scrollableItems!: MenuItem[];
    activeItem!: MenuItem;
    activeItem2!: MenuItem;


  constructor() { }

  
    ngOnInit() {
        this.items = [{
          id: 1,
          header: 'Tab 1'
        }, {
          id: 2,
          header: 'Tab 2'
        }];
       // this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({label: `Tab ${i + 1}`}));

       console.log(this.modifyData);
    }
}
