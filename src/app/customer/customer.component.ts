import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/Customer';
import { CustomerService } from '../services/customer.service';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  customer?: Customer;
 
  isDeleteLoading: any[] = [];
  searchQuerySubject = new Subject<string>();
  numberCustomers?: number;
  totalAmount: number = 0;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    this.searchQuerySubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.search(query);
      });
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.isDeleteLoading = customers.map((p) => ({
        id: p.id,
        isLoading: false,
      }));
      this.numberCustomers = this.customers.length;
      customers.map((c) => {
        if (c.amount) this.totalAmount += Number(c.amount);
      });
    });
  }
  addNewCustomer(customer: Customer) {
    this.customers = [...this.customers, customer];
  }
  updateCustomer(event: any) {
    const { customer, id } = event;
    this.customers = this.customers.map((c) => {
      if (c.id === id) {
        return customer;
      } else {
        return c;
      }
    });
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/edit/' + customer.id]);
  }
  delete(customer: Customer) {
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers?.filter(
        (item) => item.id !== customer.id
      );
      this.setIsLoading(customer, false);
    });
  }

  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((p) => p.id === customer.id)?.isLoading;
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((p) => {
      if (p.id === customer.id) {
        return { ...p, isLoading };
      }
      return p;
    });
  }

  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
  }

  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }
  details(customer: Customer) {
    this.router.navigate(['/details/' + customer.id]);
  }
}
