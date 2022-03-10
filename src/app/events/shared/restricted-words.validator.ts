import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: any){
    return (control: AbstractControl): ValidationErrors | null => {
        if(!words) {
            return {}
        }
        var invalidWords = words
                            .map((w: any)=> control.value.includes(w) ? w : null)
                            .filter((w: any)=> w != null)
        return invalidWords && invalidWords.length>0 ? {'restrictedWords': invalidWords.join(', ')} : {}
      };
}