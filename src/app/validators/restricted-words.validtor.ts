import { FormControl } from '@angular/forms';

export function restrictedWords(restrictedWords: string[]): (control: FormControl) => { [key: string]: any } {
  return (control: FormControl): { [key: string]: any } => {
    if (!restrictedWords) {
      return null;
    }

    const invalidWords: string[] = restrictedWords.map(word => control.value.includes(word) ? word : null)
      .filter(word => word != null);

    return invalidWords.length > 0 ? {'restrictedWords': invalidWords} : null;
  };
}