import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderModule, SplashScreenModule, SplashScreenService } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [AppComponent, InitScreenComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    CardModule,
    SplashScreenModule,
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
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [SplashScreenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
