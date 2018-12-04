import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { Customer } from './customer';

function range(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null =>  {
    if (control.value !== null
      && (isNaN(control.value)
        || control.value < min
        || control.value > max)) {
      return { 'range': true };
    }

    return null;
  }
}

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
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, range(1, 5)],
      sendCatalog: true,
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob@dylan.com',
    });
  }

  setNotification(medium: string): void {
    const phoneControl: FormControl = <FormControl> this.customerForm.get('phone');
    if (medium === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
