import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Customer } from '../Models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl= environment.apiUrl+'/customers';
  constructor(private http: HttpClient) { }
  getCustomers(){
    return this.http.get<Customer[]>(this.baseUrl+'/all');
  }
  addCustomer(customer: Customer){
    return this.http.post<Customer>(`${this.baseUrl}/add`, customer);
  }

}
