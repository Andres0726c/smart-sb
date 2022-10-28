import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'commons-lib';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitialParametersService {
  constructor(private httpClient: HttpClient) {}

  private _urlMS: string = environment.urlParameterizerMS;

  private _httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices
  });



  getDataInitialParameters=(serviceData: string ='',id:string=''): Observable<any> =>{
    return id!=''?this.httpClient.get<any>(`${this._urlMS}${serviceData}/${id}`,{
      headers: this._httpHeaders,
    }) : this.httpClient.get<any>(`${this._urlMS}${serviceData}`,{
      headers: this._httpHeaders,
    });

  }
}
