import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as sinon from "sinon";
import { CustomersComponent } from './customers.component';
import { CustomersStoreService } from '../../services/customers-store.service';
import { Customer } from '../../models/customer';
import { of } from 'rxjs';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  const customersFAKE: Customer[] = [
    { id: 123, name: 'Billy', firstTime: false },
    { id: 456, name: 'Jo', firstTime: false },
    { id: 999, name: 'Bob', firstTime: true }
  ];

  let customersStoreSvcSTUB: sinon.SinonStubbedInstance<CustomersStoreService>;

  beforeEach(async(() => {

    customersStoreSvcSTUB = sinon.createStubInstance(CustomersStoreService);
    customersStoreSvcSTUB.getCustomers.returns(of(customersFAKE));

    TestBed.configureTestingModule({
      declarations: [
        CustomersComponent
      ],
      providers: [
        {
          provide: CustomersStoreService,
          useValue: customersStoreSvcSTUB
        }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('startup', () => {

    it('should have initial values set', () => {

      expect(component.userName).toBe('HecoDev');

    });

    it('should run init functions', (done) => {

      expect(customersStoreSvcSTUB.getCustomers.callCount).toBe(1);

      component.customers$.subscribe((testResult) => {
        expect(testResult).toEqual(customersFAKE);
        done();
      });

    });
  });

});
