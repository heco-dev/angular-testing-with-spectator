import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { CustomersService } from './services/customers.service';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersNewComponent } from './components/customers-new/customers-new.component';

describe('AppComponent', () => {

  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      AppComponent,
      CustomersComponent,
      CustomersNewComponent
    ],
    mocks: [CustomersService]
  });

  beforeEach(() => spectator = createComponent());

  describe('constructor', () => {

    it('should run init functions', () => {

      const customersSvc = spectator.get(CustomersService);

      expect(customersSvc.storeAllCustomers).toHaveBeenCalledTimes(1);

    });
  });

});
