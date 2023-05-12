import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  private apiUrl: string = environment.urlParameterizerMS;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices
  });

  constructor(
    private httpClient: HttpClient
  ) {
    //
  }

  /**
   * Function that returns data from general microservices
   */
  getApiData = (serviceData: string = '', id: string = '') => {
    id = (id !== '' ? `/${id}` : '');
    return this.httpClient.get(`${this.apiUrl}${serviceData}${id}`, { headers: this.headers });
  };
}
