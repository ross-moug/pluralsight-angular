import { Directive } from '@angular/core';
import { Validator, FormControl, ValidationErrors, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true }
  ]
})
export class LocationValidatorDirective implements Validator {
  validate(control: FormGroup): ValidationErrors {
    const addressControl: FormControl = (<FormControl>control.controls['address']);
    const cityControl: FormControl = (<FormControl>control.controls['city']);
    const countryControl: FormControl = (<FormControl>control.controls['country']);
    const onlineUrlControl: FormControl = (<FormControl>(<FormGroup>control.root).controls['onlineUrl']);

    if ((addressControl && addressControl.value && cityControl && cityControl.value
      && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
        return null;
    } else {
      return {
        validateLocation: false
      };
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
