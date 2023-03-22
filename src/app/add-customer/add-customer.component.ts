import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  addCustomer: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.addCustomer = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      amount: [, [Validators.required]],
      accountNumber: [, [Validators.required]],
      gender: ['mal', [Validators.required]],
      accountType: ['saving', [Validators.required]],
    });
  }
  getControll(controlName: string) {
    return this.addCustomer.get(controlName);
  }
  submit() {
    this.customerService
      .addCustomer(this.addCustomer.value)
      .subscribe((customer) => {
        this.addCustomer.reset();
        this.router.navigate(['/']);
      });
  }
}
