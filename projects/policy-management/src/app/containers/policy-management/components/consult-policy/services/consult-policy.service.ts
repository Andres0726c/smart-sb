import { Identification } from './../interfaces/identification';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FilterPolicy } from '../interfaces/consult-policy';
import { environment } from 'commons-lib';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { PolicyBrief } from 'projects/policy-management/src/app/core/interfaces/policy';

@Injectable({
  providedIn: 'root',
})
export class ConsultPolicyService {
  /* Get data variables */
  private apiUrl: string = environment.urlPolicyIssuerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });

  constructor(private httpClient: HttpClient) {}

  getPolicies(filterPolicy: FilterPolicy): Observable<any> {
    return this.httpClient.get<ResponseDTO<PolicyBrief[]>>(
      `${this.apiUrl}policy/data?${this.getQueryParams(filterPolicy)}`,
      {
        headers: this.headers,
      }
    );
  }

  getPolicyById(idPolicy:number){
    return this.httpClient.get<ResponseDTO<PolicyBrief>>(
      `${this.apiUrl}policy/${idPolicy}`,
      {
        headers: this.headers,
      }
    )
  }

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

}
