import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalResponseRulesComponent } from './modal-response-rules.component';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    ModalResponseRulesComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
     MessagesModule,
  ]
})
export class ModalResponseRulesModule { }
