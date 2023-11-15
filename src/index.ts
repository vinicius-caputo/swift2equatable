import { Parser } from './parser/parser';
import { swift2equatableConverter }  from './swift2equatable';

export function swift2equatable(file: string): string {
    const parser = new Parser(file);
    parser.parseFile();
    return swift2equatableConverter.convert(parser.structList, parser.enumList);
}