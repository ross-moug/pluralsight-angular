import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.customerForm = this.builder.group({
      firstName: "",
      lastName: "",
      email: "",
      sendCatalog: true,
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: "Bob",
      lastName: "Dylan",
      email: "bob@dylan.com",
    });
  }
}
