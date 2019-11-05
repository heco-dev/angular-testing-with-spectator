import { Injectable } from "@angular/core";
import { tap, take } from 'rxjs/operators';
import { CustomersStoreService } from './customers-store.service';
import { CustomersControllerService } from '../../externals/customers-controller.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  readonly API_VERSION = "2.0";

  constructor(
    readonly customersControllerSvc: CustomersControllerService,
    readonly customersStoreSvc: CustomersStoreService
  ) { }

  storeAllCustomers() {
    this.customersControllerSvc.getCustomers(this.API_VERSION)
      .pipe(
        tap((data) => this.customersStoreSvc.setCustomers(data)),
        take(1)
      )
      .subscribe();
  }

}
