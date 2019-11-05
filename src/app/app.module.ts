import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersNewComponent } from './components/customers-new/customers-new.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, CustomersComponent, CustomersNewComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
