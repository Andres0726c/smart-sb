import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';
import { CancelPolicy } from 'projects/policy-management/src/app/containers/main/components/consult-policy/interfaces/cancel-policy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPolicyActionsService {

    /* Get data variables */
    private apiUrl: string = environment.urlPolicyIssuerMS;

    private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.apiKeyServices,
    });

  constructor(private httpClient: HttpClient) { }

  postCancelPolicy(policy: any, data: any): Observable<CancelPolicy> {
    const sendData = {
      deletionDate: data.processDate,
      startDate: policy.inceptionDate,
      endDate: policy.expirationDate,
      idPolicy: policy.idPolicy,
      idCause: data.causeType,
      observation: data.observation,
      immediate: data.immediate,
      applicationProcess: data.applicationProcess
    };
    return this.httpClient.post<CancelPolicy>(`${this.apiUrl}policy/deletion`, sendData, { headers: this.headers });
  }
  
  getCauses(applicationProcess: string): Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}cause/findAllByApplicationProcess/${applicationProcess}`, {headers: this.headers})
  }

  postRehabilitation(policy: any, data: any): Observable<any>{

    const sendData = {
      idPolicy: policy.idPolicy,
      idCause: data.causeType,
      observation: data.observation
    }
    return this.httpClient.post<any>(`${this.apiUrl}policy/rehabilitation`, sendData, {headers: this.headers});
  }

}
