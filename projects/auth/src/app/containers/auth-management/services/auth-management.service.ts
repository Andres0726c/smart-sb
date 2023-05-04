import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  roles: FormArray;

  constructor(
    fb: FormBuilder
  ) {
    this.roles = fb.array([]);
  }
}
