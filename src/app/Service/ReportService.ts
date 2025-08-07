import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../Models/Alert.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl= environment.apiUrl+'/report';
  constructor(private http: HttpClient) { }
  generateReport(alerts:Alert[]){
    return this.http.post(`${this.baseUrl}/generate`,alerts,{
      responseType:'blob'
    });
  }

}
