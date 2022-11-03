import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'commons-lib';

export interface EnumApi{
  body: {name: string}[]
}

@Injectable({
  providedIn: 'root',
})

export class TechnicalControlService {
  /* Get data variables */
  private apiUrl: string = environment.urlParameterizerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });
  /* Get data variables */

  constructor(private httpClient: HttpClient, public fb: FormBuilder) {}

  getProcess() {
    return this.httpClient.get<EnumApi>(`${this.apiUrl}process`, {
      headers: this.headers,
    })
  }

  getExecutionLevel(){
    return this.httpClient.get<EnumApi>(`${this.apiUrl}executionLevel`, {
      headers: this.headers,
    })
  }
}
