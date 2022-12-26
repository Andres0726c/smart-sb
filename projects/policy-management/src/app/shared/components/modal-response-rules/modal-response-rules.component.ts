import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'refactoring-smartcore-mf-modal-response-rules',
  templateUrl: './modal-response-rules.component.html',
  styleUrls: ['./modal-response-rules.component.scss'],
  providers:[DialogService,MessageService]
})
export class ModalResponseRulesComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  closeDialog(){
    this.ref.close();
  }
}
