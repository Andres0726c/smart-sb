import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'commons-lib';
import { map, Observable } from 'rxjs';
import { ResponseDTO } from '../../interfaces/commun/response';
import { Product } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /* Get data variables */
  private apiUrl: string = environment.urlPolicyIssuerMS;

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

  getAllProductsByCompany = (idCompany: number, pageNumber: number = 0, pageSize: number = 100): Observable<Product[]> => {
    return this.httpClient
      .get<any>(`${this.apiUrl}product/findByCompany/${idCompany}/${pageNumber}/${pageSize}`, {
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

  findByIdPolicy = (idPolicy: number): Observable<any> => {
    return this.httpClient.get<ResponseDTO<Product>>
      (`${this.apiUrl}policy/findByIdPolicy/${idPolicy}`,
        {
          headers: this.headers,
        })
  };
  getApiData = (serviceData: string = '', rlEngnCd: string = '', id:string='') => {
    id = (id !== '' ? `/${id}` : '');
    return this.httpClient.get(`${this.apiUrl}${serviceData}${id}`, { headers: this.headers });
  };
}
