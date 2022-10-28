import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';

@Injectable({
  providedIn: 'root'
})
export class WaitingTimeService {

  /* Get data variables */
  private apiUrl: string = environment.urlParameterizerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });
  
  constructor(private httpClient: HttpClient) { }

  getWaitingTime(bussinessCode: String){
    return this.httpClient.get<any>(`${this.apiUrl}domainList/${bussinessCode}`, {
      headers: this.headers,
    })
  }
}
