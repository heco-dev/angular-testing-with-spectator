import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CustomersService } from './customers.service';
import { CustomersStoreService } from './customers-store.service';
import { CustomersControllerService } from '../../externals/customers-controller.service';
import { Customer } from '../models/customer';
import { of } from 'rxjs';

describe('CustomersService', () => {

  let spectator: SpectatorService<CustomersService>;

  const createService = createServiceFactory({
    service: CustomersService,
    mocks: [CustomersStoreService, CustomersControllerService]
  });

  beforeEach(() => spectator = createService());

  describe('getAllCustomers', () => {

    const customersFAKE: Customer[] = [{ id: 999, name: 'foo', firstTime: false }];

    it('should get data from server and put into local store', () => {

      const customersStoreSvc = spectator.get(CustomersStoreService);
      const customersControllerSvc = spectator.get(CustomersControllerService);
      customersControllerSvc.getCustomers.and.returnValue(of(customersFAKE));

      spectator.service.storeAllCustomers();

      expect(customersControllerSvc.getCustomers).toHaveBeenCalledTimes(1);
      expect(customersStoreSvc.setCustomers).toHaveBeenCalledWith(customersFAKE);

    });

  });

});
