import { Component, Input, OnChanges} from '@angular/core';
import { FormControl } from '@angular/forms';

interface Category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
/**
  ** Multiple selection component with checkbox and internal search engine
  * @author kathe-cr
*/
export class MultiSelectComponent implements OnChanges{

  //* User Selected Options
  @Input() selectedOptions: any = new FormControl([]);
  @Input() Placeholder: string= "";

  cloneSelectedOptions: string[] = []
  //* Search field to filter options
  fieldSearch: string =''
  //* Options displayed by the user
  listOptions: string[] = []; 
  //* Input list of options that the user has
  @Input() dataOptions: string[] = [];
  //* Quick access controller to select all options
  allSelected: boolean = false;

  constructor() {
  }

  /**
   * Detect changes to the dataOptions input variable and update the display listing
   */
  ngOnChanges(): void {
    this.listOptions = this.dataOptions.slice();
  }

  /**
   * Clear or update selectedOptions based on the state of allSelected
   */
  masterToggle() {
    this.allSelected
      ? this.cloneSelectedOptions = []
      : this.cloneSelectedOptions=this.dataOptions.slice()
    this.selectedOptions.setValue(this.cloneSelectedOptions);
    this.allSelected = !this.allSelected;
  }

  /**
   * Clear or check "all" checkbox when pressing any multiselect option
   */
  toggleOptionAll() {
    this.selectedOptions.value.length == this.dataOptions.length
      ? this.allSelected = true
      : this.allSelected = false
  }

  /**
   * Update cloneSelectedOptions and assigns it to selectedOption so as not to lose the previous data when it is selected and a search is in progress
   * @param option string of the option selected by the user
   */
  selectOption(option:string){
    if(this.fieldSearch != ''){
      this.cloneSelectedOptions.find(element => element == option)
        ? this.cloneSelectedOptions = this.cloneSelectedOptions.filter(element => element != option)
        : this.cloneSelectedOptions.push(option)
      this.selectedOptions.setValue(this.cloneSelectedOptions)
    }else{
      this.cloneSelectedOptions = this.selectedOptions.value
    }
    this.toggleOptionAll();
  }

  /**
   * Remove the first element of the selectedOptions array
   */
  removeOption(){
    this.selectedOptions.setValue(this.selectedOptions.value.slice(1, this.selectedOptions.value.length))
    this.cloneSelectedOptions = this.selectedOptions.value
  }

  /**
   * Filter the listOptions variable to display the elements that correspond to the search according to the fieldSerch field
   */
  applyFilter() {
    const filterValue = this.fieldSearch.toLowerCase();
    this.listOptions = this.dataOptions.filter((item) =>
      item.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Reset search elements when close or open multi-select 
   */
  reset(){
    this.fieldSearch = '';
    this.listOptions = this.dataOptions;
    this.cloneSelectedOptions = this.cloneSelectedOptions.sort((a,b)=>{
      return this.dataOptions.indexOf(a) > this.dataOptions.indexOf(b) ? 1 : -1;
    })
  }
}
