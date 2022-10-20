import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';
import { HeaderModule } from 'commons-lib';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    InitScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    HeaderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
