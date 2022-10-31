import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'commons-lib';

export interface EnumApi{
  body: {name: string, id: number}[]
}

@Injectable({
  providedIn: 'root'
})
export class ClaimReservationConceptService {

  /* Get data variables */
  private apiUrl: string = environment.urlParameterizerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });
  /* Get data variables */
  constructor(private httpClient: HttpClient, public fb: FormBuilder) {}

  getConcept(ramo: string, company: string) {
    return this.httpClient.get<any>(`${this.apiUrl}reserveConcept/findByCompanyAndInsuranceLine/${company}/${ramo}/0/0/0`, {
      headers: this.headers,
    })
  }

  getExecutionLevel(ramo: string, company: string){
    return this.httpClient.get<EnumApi>(`${this.apiUrl}claimCause/findByCompanyAndInsuranceLine/${company}/${ramo}/0/0/0/0`, {
      headers: this.headers,
    })
  }
}
