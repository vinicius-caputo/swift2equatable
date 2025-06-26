import { lexemes } from "../parser/lexemes";

export function captalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addArraySuffixIfNeeded(word: string): string {     
    if (word.match(lexemes.arraySpecialCaracters)) {
        return word.replaceAll(lexemes.arraySpecialCaracters, "") + "Array";
    }
    return word;
}