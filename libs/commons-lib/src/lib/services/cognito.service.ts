import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, Subscription } from 'rxjs';
import { Auth, Amplify } from 'aws-amplify';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  tokenSubscription = new Subscription()
  timeout: any;

  public authenticationSubject: BehaviorSubject<any>;

  constructor(
    public router: Router
  ) {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(true);

    this.getUser()
    .then((value) => {
      if (value) {
        this.authenticationSubject.next(true);
        this.sessionTimer();
      } else {
        this.authenticationSubject.next(false);
      }
    })
    .catch((err) => {
      this.authenticationSubject.next(false);
    })
    
  }

  public async signIn(email: string, password: string): Promise<any> {
    const res = await Auth.signIn(email, password);
    await this.getUser()
    .then((value) => {
      if (value) {
        localStorage.setItem('CognitoSessionExp', value.signInUserSession.accessToken.payload.exp);
        this.authenticationSubject.next(true);
        this.sessionTimer();
      }
    })
    .catch((err) => {
      this.authenticationSubject.next(false);
    })
    return res;
  }

  sessionTimer() {
    this.getUser()
    .then((value) => {
      localStorage.setItem('CognitoSessionExp', value.signInUserSession.accessToken.payload.exp);
      this.timeout = (900 * 1000) // se especifica el tiempo de inactividad deseado
      this.expirationCounter(this.timeout);
    })
  }

  expirationCounter(timeout: any) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      this.authenticationSubject.next(false);
    });
  }

  public async signOut(): Promise<any> {
    await this.setUserCompany({});
    return Auth.signOut()
    .then(() => {
      localStorage.clear();
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }

  public async getAuth() {
    return await Auth.currentSession();
  }

  public async setUserCompany(company: any) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'custom:sessionInformation': JSON.stringify(company)
      });
    } catch(error) {
      console.log('error: ', error);
    }
    
  }

  public async getUserCompany() {
    let returnValue = '{}';
    await this.getUser()
    .then((value) => {
      if (value && value.attributes['custom:sessionInformation'] && value.attributes['custom:sessionInformation'] !== '') {
        returnValue = value.attributes['custom:sessionInformation'];
      }
    });
    return JSON.parse(returnValue);
  }

}