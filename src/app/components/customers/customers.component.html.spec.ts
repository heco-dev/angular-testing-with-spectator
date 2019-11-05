import * as sinon from "sinon";
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CustomersComponent } from './customers.component';
import { Customer } from '../../models/customer';
import { CustomersStoreService } from '../../services/customers-store.service';
import { of } from 'rxjs';

describe('CustomersComponentTemplate', () => {

  let spectator: Spectator<CustomersComponent>;

  const createComponent = createComponentFactory({
    component: CustomersComponent,
    declarations: [
      CustomersComponent
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

      expect((customersStoreSvc.getCustomers as any).callCount > 0).toBe(true);

    });
  });

  describe('customers.component.html', () => {

    const customersFAKE: Customer[] = [
      { id: 123, name: 'Billy', firstTime: false },
      { id: 456, name: 'Jo', firstTime: false },
      { id: 999, name: 'Bob', firstTime: true }
    ];

    it('should render 3 elements in the unordered list', () => {

      spectator = createComponent({
        props: {
          customers$: of(customersFAKE)
        }
      });

      const nodeList = spectator.queryAll('li');

      // nodeList[2].outerHTML //?

      expect(nodeList.length).toBe(3);
      expect(nodeList[1].innerHTML.trim()).toBe('Jo (id: 456)');

    });

    it('should show list empty message to user', () => {

      spectator = createComponent({
        props: {
          customers$: undefined
        }
      });

      const spanEle = spectator.query('span');
      // spanEle.innerHTML //?

      expect(spanEle.innerHTML.trim()).toBe('fetching customer data...');

    });

  });

});
