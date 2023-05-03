import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  private apiUrl: string = environment.urlParameterizerMS;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices
  });

  roles:any = new FormArray([
    
  ]);


  constructor(
    private httpClient: HttpClient,
    public fb: FormBuilder,
  ) { 
    this.roles.push(new FormControl({
      name: 'rol 1',
      description: 'rol 1'
    }));
  }

  /**
   * Function that returns data from general microservices
   */
  getApiData = (serviceData: string = '', id: string = '') => {
    id = (id !== '' ? `/${id}` : '');
    return this.httpClient.get(`${this.apiUrl}${serviceData}${id}`, { headers: this.headers });
  };

  getRoles(){
    return this.roles;
  }
}
