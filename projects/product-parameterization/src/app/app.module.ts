import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalSessionRestartModule } from './shared/modal-session-restart/modal-session-restart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalSessionRestartModule
  ],
  providers: [
    FormBuilder,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition:'right', verticalPosition:'bottom' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
