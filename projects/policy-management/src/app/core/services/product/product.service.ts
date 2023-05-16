import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';

import { map, Observable } from 'rxjs';
import { ResponseDTO } from '../../interfaces/commun/response';
import { Product } from '../../interfaces/product/product';
import { DomainList } from '../../interfaces/domainList';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /* Get data variables */
  private apiUrl: string = environment.urlPolicyIssuerMS;
  private apiUrlAdapter: string = environment.urlAdapterMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices,
  });
  constructor(private httpClient: HttpClient) { }

  getAllProducts = (): Observable<Product[]> => {
    return this.httpClient
      .get<ResponseDTO<Product[]>>(`${this.apiUrl}product/findAll`, {
        headers: this.headers,
      })
      .pipe(map((data: ResponseDTO<Product[]>) => data.body));
  };

  getAllProductsByCompany = (idCompany: number, search: string = "0", pageNumber: number = 0, pageSize: number = 50): Observable<Product[]> => {
    search = search==""||search ==null?"0":search;
    return this.httpClient
      .get<any>(`${this.apiUrl}product/findByCompany/${idCompany}/${search}/${pageNumber}/${pageSize}`, {
        headers: this.headers,
      })
      .pipe(map((data: ResponseDTO<Product[]>) => data.body));
  };

  getProductById = (idProduct: number): Observable<any> => {
    return this.httpClient.get<ResponseDTO<Product>>
      (`${this.apiUrl}product/findById/${idProduct}`,
        {
          headers: this.headers,
        })
  };

  getProductByCode = (code: string): Observable<any> => {
    return this.httpClient.get<ResponseDTO<Product>>
      (`${this.apiUrl}product/findByBusinessCode/${code}`,
        {
          headers: this.headers,
        })
  };

  findByIdPolicy = (idPolicy: number): Observable<any> => {
    return this.httpClient.get<ResponseDTO<Product>>
      (`${this.apiUrl}policy/findByIdPolicy/${idPolicy}`,
        {
          headers: this.headers,
        })
  };

  getApiData = (serviceData: string = '', rlEngnCd: string = '', id:string=''):Observable<any> => {
    id = (id !== '' ? `/${id}` : '');
    return this.httpClient.get<ResponseDTO<DomainList>>
    (`${this.apiUrl}${serviceData}${id}`, { headers: this.headers });
  };

  findPolicyDataById = (idPolicy: number, status: number): Observable<any> => {
    return this.httpClient.get<ResponseDTO<Product>>
      (`${this.apiUrl}policy/findPolicyDataById/${idPolicy}/${status}`,
        {
          headers: this.headers,
        })
  };

  modificationPolicyClaimStatus = (smartCorePolicyNumber: string): Observable<any> => {
    return this.httpClient.get<ResponseDTO<any>>
      (`${this.apiUrl}policy/modificationPolicyClaimStatus/${smartCorePolicyNumber}`,
        {
          headers: this.headers,
        })
  };

  getPremiumData = (policyNumber: number, endorsementNumber: number): Observable<any> => {
    return this.httpClient.get<ResponseDTO<any>>
      (`${this.apiUrlAdapter}policy/taxes?smartCorePolicyNumber=${policyNumber}&endorsementNumber=${endorsementNumber}`,
        {
          headers: this.headers,
        });
  };

  executeRule( data: any): Observable<any>{

    return this.httpClient.post<any>(`${this.apiUrl}rule/executeOneRule`, data, {headers: this.headers});
  }

  saveModify( data: any): Observable<any>{
    console.log(data,"data a viajar");

    return this.httpClient.post<any>(`${this.apiUrl}policy/saveModifyPolicy`, data, {headers: this.headers});
  }

  findDependencyByKeyCode(deps: any, key: string, code: string) {
    console.log('deps',deps[key])
    return deps[key].find((x: any) => x.cd === code);
  }
}
