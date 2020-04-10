import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../employee-list/employee-list.component';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url: any = 'http://localhost:3000/api/';
  // headers: any = new HttpHeaders();
  // headers.set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addEmployee(employeeData: any) {
    const Url = `${this.url}addEmployee`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.post<any>(Url, employeeData, { headers });
  }

  getEmployees() {
    const Url = `${this.url}getEmployees`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.get<any>(Url, { headers });
  }

  getEmployee(id: any) {
    const Url = `${this.url}getEmployee/${id}`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.get<any>(Url, { headers });
  }

  deleteEmployees(id: any) {
    const Url = `${this.url}deleteEmployee/${id}`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.delete<any>(Url, { headers });
  }

  updateEmployee(employeeData: any) {
    const Url = `${this.url}updateEmployee/${employeeData._id}`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.patch<Employee>(Url, employeeData, { headers });
  }
}
