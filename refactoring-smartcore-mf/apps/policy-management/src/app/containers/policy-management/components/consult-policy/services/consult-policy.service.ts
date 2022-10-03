import { Identification } from './../interfaces/identification';
import { Observable, tap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FilterPolicy } from '../interfaces/consult-policy';
import { ResponseDTO } from 'apps/policy-management/src/app/core/interfaces/commun/response';
import { PolicyBrief } from 'apps/policy-management/src/app/core/interfaces/policy';
import { environment } from 'apps/policy-management/src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ConsultPolicyService {
  /* Get data variables */
  private apiUrl: string = environment.urlMicroServices;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });

  constructor(private httpClient: HttpClient) {}

  getPolicies = (
    filterPolicy: FilterPolicy
  ): Observable<any> => {
    return this.httpClient.get<ResponseDTO<PolicyBrief[]>>(
      `${this.apiUrl}policy/data?${this.getQueryParams(filterPolicy)}`,
      {
        headers: this.headers,
      }
    )
  };

  getQueryParams = (params: any): string => {
    let parameters: HttpParams = new HttpParams({ fromObject: params });
    return parameters.toString();
  };

  getDocumentType = (): Observable<Identification[]> => {
    return this.httpClient
      .get<any>(`${this.apiUrl}identificationtype/findAll`, {
        headers: this.headers,
      })
      .pipe(map((data: any) => data.body));
  };

  cancelDate(policy: any, data: any): Observable<PolicyBrief>{
    const sendData = {
      "deletionDate": data.processDate ,
      "startDate": policy.inceptionDate,
      "endDate": policy.expirationDate,
      "idPolicy": policy.idPolicy,
      "idCause": data.causeType,
      "observation": data.observation
  }
    return this.httpClient.post<PolicyBrief>(`${this.apiUrl}policy/deletion`, sendData, {headers: this.headers})
  }
}
