import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';
import {CardModule} from 'primeng/card';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { SplashScreenService } from './services/splash-screen.service';

@NgModule({
  declarations: [AppComponent, SplashScreenComponent, InitScreenComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    HeaderModule,
    CardModule,
    RouterModule.forRoot(
      [
        {
          path: 'emisor',
          loadChildren: () =>
            import('policy-management/Module').then(
              (m) => m.PolicyManagementModule
            ),
        },
        {
          path: '',
          component: InitScreenComponent,
        },
      ]
    ),
  ],
  providers: [SplashScreenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
