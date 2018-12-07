import {
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function range(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== null
      && (isNaN(control.value)
        || control.value < min
        || control.value > max)) {
      return { 'range': true };
    }

    return null;
  };
}

function emailMatcher(control: AbstractControl): { [key: string]: boolean } | null {
  const emailControl: FormControl = <FormControl>control.get('email');
  const confirmEmailControl: FormControl = <FormControl>control.get('confirmEmail');

  if (emailControl.pristine
    || confirmEmailControl.pristine
    || emailControl.value === confirmEmailControl.value) {
    return null;
  }

  console.log('match failed!');
  return { 'match': true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  messages: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [messageKey: string]: string } } = {
    'emailGroup.email': {
      required: 'Please enter your email address.',
      email: 'Please enter a valid email address.',
    },
    'emailGroup.confirmEmail': {
      required: 'Please confirm your email address.',
      match: 'The confirmation does not match the email address.',
    },
    lastName: {
      required: 'Please enter your last name',
      maxlength: 'The last name must be less than 50 characters.',
    },
    firstName: {
      required: 'Please enter your first name',
      minlength: 'The first name must be longer than 3 characters.',
    },
    phone: {
      required: 'Please enter your phone number.',
    },
    rating: {
      range: 'Please rate your experience from 1 to 5.',
    },
  };

  constructor(
    private builder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.customerForm = this.builder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.builder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, range(1, 5)],
      sendCatalog: true,
      addresses: this.createAddressGroup(),
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    Object.keys(this.validationMessages).forEach(key => {
      const emailControl: FormControl = <FormControl>this.customerForm.get(key);
      emailControl.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(
          () => this.setMessage(emailControl, key)
        );
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
    const phoneControl: FormControl = <FormControl>this.customerForm.get('phone');
    if (medium === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  createAddressGroup(): FormGroup {
    return this.builder.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      postCode: '',
    });
  }

  private setMessage(control: AbstractControl, controlKey: string): void {
    this.messages[controlKey] = '';

    if ((control.touched || control.dirty)
      && control.errors) {
      this.messages[controlKey] = Object.keys(control.errors)
        .map(key => this.messages[controlKey] += this.validationMessages[controlKey][key]).join(' ');
    }
  }
}
