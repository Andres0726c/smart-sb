import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'commons-lib';

@Injectable({
  providedIn: 'root'
})
export class ModalEditProductService {

  constructor(private httpClient: HttpClient) {}

  private _urlMS: string = environment.urlParameterizerMS;

  private _httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key':environment.apiKeyServices
  });

  getDataEdit=(serviceData: string ='',id:string=''): Observable<any> =>{
    return id!=''?this.httpClient.get<any>(`${this._urlMS}${serviceData}/${id}`,{
      headers: this._httpHeaders,
    }) : this.httpClient.get<any>(`${this._urlMS}${serviceData}`,{
      headers: this._httpHeaders,
    });

  }

   getProductRamo=(search: string='0', page: number = 0, size:number = 0): Observable<any> => {
    search= search == ""?'0':search;
    return this.httpClient.get<any>(`${this._urlMS}/findByName/${page}/${size}/${search}`,{
      headers: this._httpHeaders,
    })
  }

  validProduct=(serviceData: string='',id:string=''): Observable<any> => {
    return id!=''?this.httpClient.get<any>(`${this._urlMS}${serviceData}/${id}`,{
      headers: this._httpHeaders,
    }) : this.httpClient.get<any>(`${this._urlMS}${serviceData}`,{
      headers: this._httpHeaders,
    });
  }

  validCode=(serviceData: string='',id:string=''): Observable<any> => {
    return id!=''?this.httpClient.get<any>(`${this._urlMS}${serviceData}/${id}`,{
      headers: this._httpHeaders,
    }) : this.httpClient.get<any>(`${this._urlMS}${serviceData}`,{
      headers: this._httpHeaders,
    });
  }


}
