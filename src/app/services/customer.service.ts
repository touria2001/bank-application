import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(URL);    
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(URL, customer);
  }

  updateCustomer(id:number,customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${URL}/${id}`, customer);
  }
  deleteCustomer(customer:Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${URL}/${customer.id}`);
  }
  search(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${URL}?q=${name}`);
  }

  getCustomerById(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${URL}/${id}`);
  }
}
