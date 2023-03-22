import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';
import { Customer } from '../model/Customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomer: FormGroup;
 
  customer?: Customer;
  

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.updateCustomer = this.formBuilder.group({
      firstName: [this.customer?.firstName, [Validators.required]],
      lastName: [this.customer?.lastName, [Validators.required]],
      email: [
        this.customer?.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      address: [this.customer?.address, [Validators.required]],
      phone: [this.customer?.phone, [Validators.required]],
      amount: [this.customer?.amount, [Validators.required]],
      accountNumber: [this.customer?.accountNumber, [Validators.required]],
      gender: [this.customer?.gender, [Validators.required]],
      accountType: [this.customer?.accountType, [Validators.required]],
    });
  }
  ngOnInit() {
    this.activeRoute.params
    .pipe(
      switchMap((params) => this.customerService.getCustomerById(params['id']))
    )
    .subscribe({
      next: (customer) => {

        this.customer = customer;       
        this.updateCustomer.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          email: customer.email,
          gender: customer.gender,
          accountType: customer.accountType,
          address: customer.address,
          amount: customer.amount,
          accountNumber: customer.accountNumber,
        });
      },
      error: () => this.router.navigate(['/not-found']),
    });
    
  }


  getControll(controlName: string) {
    return this.updateCustomer.get(controlName);
  }

  submit() {    
    if(this.customer?.id) {
    const updatedCustmer = { ...this.customer, ...this.updateCustomer.value };
      this.customerService
        .updateCustomer(this.customer.id, this.updateCustomer.value)
        .subscribe(() => {          
       
         this.router.navigate(['/'])
          
        });
      }
    
  }
}
