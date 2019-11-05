import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersStoreService } from '../../services/customers-store.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html'
})
export class CustomersNewComponent {

  newCustomers$: Observable<Customer[]>;

  constructor(
    readonly customersStoreSvc: CustomersStoreService
  ) {
    this.newCustomers$ = this.customersStoreSvc.getNewCustomersOnly();
  }

}
