import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CognitoService, environment } from 'commons-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Smartcore';
  userName = '';
  company: any = null;
  userActivity: any;

  constructor(
    private titleService: Title,
    public router: Router,
    public cognitoService: CognitoService
  ) {
    this.titleService.setTitle(environment.smartcoreSiteTitle);

    cognitoService.authenticationSubject.subscribe((valueSession) => {
      if (!valueSession && !router.url.includes('/productos')) {
        cognitoService.getUser()
        .then((value) => {
          if (value) {
            this.signOut();
          }
        })
        .catch((err) => {
          // Usuario no autenticado
        });
      }
    });
  }

  resetSessionTimer() {
    clearTimeout(this.userActivity);
    this.cognitoService.getUser()
      .then((value) => {
        if (
          value
          && value.attributes['custom:sessionInformation'] 
          && value.attributes['custom:sessionInformation'] !== '{}' 
          && value.attributes['custom:sessionInformation'] !== ''
        ) {
          this.userName = value.username;
          this.company = JSON.parse(value.attributes['custom:sessionInformation']);
          this.cognitoService.sessionTimer();
        }
      })
      .catch((err) => {
        // Usuario no autenticado
      });
  }

  signOut() {
    this.cognitoService.signOut()
    .then((value) => {
      this.router.navigate(['/autenticacion']);
    })
    .catch((err) => {
      console.log('Ha ocurrido un error al cerrar la sesión')
    });
  }

  @HostListener('window:mousemove') 
  @HostListener('document:keypress') 
  refreshUserState() {
    this.resetSessionTimer();
  }
}
