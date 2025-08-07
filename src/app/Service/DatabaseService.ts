import { Injectable } from '@angular/core';
import { Customer } from '../Models/Customer.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Condition } from '../Models/Condition.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseUrl= environment.apiUrl+'/database';
  constructor(private http: HttpClient) { }
  getTables(){
    return this.http.get<string[]>(this.baseUrl+'/tables');
  }
  getFieldsForTable(tableName:string){
    return this.http.get<string[]>(`${this.baseUrl}/${tableName}`);
  }
}
