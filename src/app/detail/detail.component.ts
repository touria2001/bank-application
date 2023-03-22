import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from '../model/Customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  customer?: Customer;
  constructor(private router: Router,private route: ActivatedRoute, private customerService: CustomerService) {    
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params) => this.customerService.getCustomerById(params['id'])))
      .subscribe({
        next: (customer) => { this.customer = customer; },
        error: () => {
          this.router.navigate(['/not-found']);
        },
    });
  }

}
