import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../DTO/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl= environment.apiUrl+'/dashboard';
  constructor(private http: HttpClient) { }
  getDashboard(){
    return this.http.get<Dashboard>(`${this.baseUrl}/myDashboard`);
  }
}
