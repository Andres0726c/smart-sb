import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';
import { CommonsLibModule, HeaderModule } from 'commons-lib';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from 'projects/product-parameterization/src/app/shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from '../assets/lang/paginator-intl';
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    InitScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CardModule,
    HeaderModule,
    AppRoutingModule,
    CommonsLibModule
  ],
  providers: [
    FormBuilder,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition:'right', verticalPosition:'bottom' } },
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
