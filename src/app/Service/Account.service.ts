import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../Models/Account.model';
import { AccountDTO } from '../DTO/AccountDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl= environment.apiUrl+'/account';
  constructor(private http: HttpClient) { }
  getCurrencies(){
    return this.http.get<string[]>(this.baseUrl+'/currencies');
  }
  getAccountTypes(){
    return this.http.get<string[]>(this.baseUrl+'/types');
  }
  addAccount(account:AccountDTO){
    return this.http.post<Account>(`${this.baseUrl}/create`, account);
  }
  getAccountsByUser(){
    return this.http.get<Account[]>(this.baseUrl+'/getAccountForUser');
  }


}
