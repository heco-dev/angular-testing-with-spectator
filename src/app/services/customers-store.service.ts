import { Injectable } from '@angular/core';
import { SimpleStore } from '../../externals/simple-store';
import { Customer } from '../models/customer';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomersStoreService {

    readonly customers = new SimpleStore<Customer[]>();

    setCustomers(data: any[]) {
        this.customers.setState(data);
    }

    getCustomers() {
        return this.customers.state$;
    }

    getNewCustomersOnly() {
        return this.customers.state$
            .pipe(
                map((customers) => customers.filter((customer) => customer.firstTime))
            );
    }

}
