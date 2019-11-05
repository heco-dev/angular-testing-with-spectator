import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { customers } from '../fakes/list-of-customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersControllerService {

  readonly FAKE_NETWORK_DELAY_MILLI = 777;

  getCustomers(apiVersion: string) {
    return of(customers).pipe(delay(this.FAKE_NETWORK_DELAY_MILLI));
  }

}