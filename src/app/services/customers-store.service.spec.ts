import { TestBed } from '@angular/core/testing';
import { CustomersStoreService } from './customers-store.service';
import { Customer } from '../models/customer';

describe('CustomersStoreService', () => {

  let service: CustomersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CustomersStoreService);
  });

  describe('customers', () => {

    const customersFAKE: Customer[] = [
      { id: 123, name: 'Billy', firstTime: false },
      { id: 456, name: 'Jo', firstTime: false },
      { id: 999, name: 'Bob', firstTime: true }
    ];

    it('should set customers and get all stored customers', (done) => {

      service.setCustomers(customersFAKE);

      service.getCustomers()
        .subscribe((testResult) => {
          expect(testResult).toEqual(customersFAKE);
          done();
        });

    });

    it('should set customers and get only new customers', (done) => {

      service.setCustomers(customersFAKE);

      service.getNewCustomersOnly()
        .subscribe((testResult) => {
          expect(testResult.length).toBe(1);
          expect(testResult[0].name).toBe('Bob');
          done();
        });

    });

  });
});
