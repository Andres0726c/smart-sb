import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';

@Injectable({
  providedIn: 'root',
})
/**
 * component that handles service to request waiting time data
 */
export class WaitingTimeService {
  /* Get data variables */
  private apiUrl: string = environment.urlParameterizerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });

  /**
   * 
   * @param httpClient contrusctor empty
   */
  constructor(private httpClient: HttpClient) {
    //contructor
  }

  /**
   * method that  request waiting time data
   * @param bussinessCode 
   * @returns 
   */
  getWaitingTime(bussinessCode: String) {
    return this.httpClient.get<any>(
      `${this.apiUrl}domainList/${bussinessCode}`,
      {
        headers: this.headers,
      }
    );
  }
}
