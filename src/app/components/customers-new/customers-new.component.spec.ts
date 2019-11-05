import * as sinon from 'sinon';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CustomersNewComponent } from './customers-new.component';
import { CustomersStoreService } from '../../services/customers-store.service';
import { Customer } from '../../models/customer';
import { of } from 'rxjs';

describe('CustomersNewComponent', () => {

  let spectator: Spectator<CustomersNewComponent>;

  const createComponent = createComponentFactory({
    component: CustomersNewComponent,
    declarations: [
      CustomersNewComponent
    ],
    componentProviders: [
      {
        provide: CustomersStoreService,
        useValue: sinon.createStubInstance(CustomersStoreService)
      }
    ]
  });

  beforeEach(() => spectator = createComponent());

  afterEach(() => sinon.restore());

  describe('startup', () => {

    it('should run init functions', () => {

      const customersStoreSvc = spectator.get(CustomersStoreService, true);

      expect((customersStoreSvc.getNewCustomersOnly as any).callCount > 0).toBe(true);

    });
  });

  describe('newCustomers$', () => {

    const customersFAKE: Customer[] = [
      { id: 999, name: 'Bob', firstTime: true }
    ];

    // does this make any sense at all???
    it('should have the data in the member property', (done) => {

      spectator = createComponent({
        props: {
          newCustomers$: of(customersFAKE)
        }
      });

      spectator.component.newCustomers$.subscribe((testResult) => {
        expect(testResult).toEqual(customersFAKE);
        done();
      });

    });

    // makes more sense to test the template, doesn't it?
    it('should show list empty message to user', () => {

      spectator = createComponent({
        props: {
          newCustomers$: undefined
        }
      });

      const spanEle = spectator.query('span');
      // spanEle.innerHTML //?

      expect(spanEle.innerHTML.trim()).toBe('fetching new customer data...');

    });

    // makes more sense to test the template, doesn't it?
    it('should show list of new customers', () => {

      spectator = createComponent({
        props: {
          newCustomers$: of(customersFAKE)
        }
      });

      const nodeList = spectator.queryAll('li');
      // nodeList[0].innerHTML //?

      expect(nodeList.length).toBe(1);
      expect(nodeList[0].innerHTML.trim()).toBe('Bob (id: 999)');

    });

  });

});
