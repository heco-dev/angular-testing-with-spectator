import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersStoreService } from '../../services/customers-store.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent {

  userName = 'HecoDev';

  customers$: Observable<Customer[]>;

  constructor(
    readonly customersStoreSvc: CustomersStoreService
  ) {
    this.customers$ = this.customersStoreSvc.getCustomers();
  }

}
