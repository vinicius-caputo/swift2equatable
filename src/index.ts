import { Parser } from './parser/parser';
import { swift2equatableConverter }  from './swift2equatable';

export function swift2equatable(file: string, usePublic: boolean = false, useRetroactive: boolean = false): string {
    const parser = new Parser(file);
    parser.parseFile();
    return swift2equatableConverter.convert(parser.structList, parser.enumList, usePublic, useRetroactive);
}