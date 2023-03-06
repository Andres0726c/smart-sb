import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { PolicyBrief } from 'projects/policy-management/src/app/core/interfaces/policy';
import { Observable } from 'rxjs';
import { FilterPolicyFailed } from '../interfaces/consult-policy-failed';

@Injectable({
  providedIn: 'root'
})
export class SyncPolicyFailedService {

  /* Get data variables */
  private apiUrl: string = environment.urlAdapterMS;
  private apiUrlNode: string = environment.urlAdapterNodeMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });

  
  constructor(private httpClient: HttpClient) { }

  postPoliciesFailed(filterPolicy: FilterPolicyFailed): Observable<any> {
    let datestring = null;
    if (filterPolicy.date != '') {
      [datestring] = filterPolicy.date.toISOString().split('T');
    }
    
    const sendData = {
      smartCorePolicyNumber: filterPolicy.smartCorePolicyNumber == ""?null:filterPolicy.smartCorePolicyNumber,
      tronPolicyNumber: filterPolicy.tronPolicyNumber == ""?null:filterPolicy.tronPolicyNumber,
      process: filterPolicy.process == ""?null:filterPolicy.process,
      date: datestring,
    };
    return this.httpClient.post<PolicyBrief[]>(`${this.apiUrl}queue/listfailedmessages`, sendData, { headers: this.headers });
  }


  postSendDataPoliciesFailed(dataPolicies: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrlNode}create`, dataPolicies.json, { headers: this.headers });
  }

}
