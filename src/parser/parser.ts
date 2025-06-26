import { lexemes } from './lexemes';
import { SyntaxTree, Enum, EnumCase, EnumCaseParameter, Property, Struct } from '../types';
import { addArraySuffixIfNeeded } from '../util';

export class Parser {
    private lines: string[];
    private sytaxTree: SyntaxTree;

    constructor(file: string) {
        file = this.clearUnnecessaryStructures(file)
        this.lines = file.split("\n");
        this.sytaxTree = { 
            structs: [],
            enums: []
        };
    }

    private clearUnnecessaryStructures(file: string): string {
        file = file.replaceAll(lexemes.init, "");
        file = file.replaceAll(lexemes.function, "");
        file = file.replaceAll(lexemes.switch, "");
        return file;
    }

    public parseFile(): SyntaxTree {
        while (this.lines.length > 0) {
            let line = this.lines.shift() ?? "";
            const structMatch = line.match(lexemes.struct);
            const enumMatch = line.match(lexemes.enum);
            if (structMatch) { 
                this.sytaxTree.structs.push(this.parseStruct(structMatch[2]));
            } 
            else if (enumMatch) {
                this.sytaxTree.enums.push(this.parseEnum(enumMatch[1]));
            }
        }
        return this.sytaxTree;       
    }

    private parseStruct(fatherName: string): Struct {
        let struct: Struct = {
            fullName: fatherName,
            property: [],
            subStructs: [],
            enums: []
        };
        while (this.lines.length > 0) {
            let line = this.lines.shift() ?? "";
            const structMatch = line.match(lexemes.struct);
            const enumMatch = line.match(lexemes.enum);
            const variableMatch = line.match(lexemes.variable);
            const endBracketMatch = line.match(lexemes.endBracket);

            if (structMatch) struct.subStructs.push(this.parseStruct(fatherName + "." + structMatch[2]));
            else if (variableMatch) struct.property = struct.property.concat(this.parseProperty(variableMatch));
            else if (enumMatch) struct.enums.push(this.parseEnum(fatherName + "." + enumMatch[1]));
            else if (endBracketMatch) return struct;
        }
        return struct
    }

    private parseProperty(match: RegExpMatchArray): Property[] {
        let properties: Property[] = [];
        const identifiers = match[2].matchAll(lexemes.identifier); 
        const type = match[3];
        for (const identifier of identifiers) {
            properties.push({
                name: identifier[0],
                type: type
            });
        }
        return properties;
    }

    private parseEnum(fatherName: string): Enum {
        let enumStruct: Enum = {
            name: fatherName,
            cases: []
        };
        while (this.lines.length > 0) {
            let line = this.lines.shift() ?? "";
            const enumCaseMatch = line.match(lexemes.enumCase);
            const endBracketMatch = line.match(lexemes.endBracket);

            if (enumCaseMatch) enumStruct.cases.push(this.parseEnumCase(enumCaseMatch));
            else if (endBracketMatch) return enumStruct;
        }
        return enumStruct;
    }

    private parseEnumCase(match: RegExpMatchArray): EnumCase {
        return {
            name: match[1],
            parameters: match[3] ? this.parseEnumCaseParameters(match[3]) : []
        }
    }

    private parseEnumCaseParameters(parametersDeclaration: string): EnumCaseParameter[] {
        return parametersDeclaration.split(",").map((parameter, index) => {
            const trimmedParameter = parameter.trim();
            const parameterSplit = trimmedParameter.split(":");
            
            return {
                name: parameterSplit.length === 1 ? undefined : parameterSplit[0],
                type: parameterSplit.length === 1 ? addArraySuffixIfNeeded(parameterSplit[0]) + index : parameterSplit[1]
            };
        });
    }

    get structList(): Struct[] {
        return this.getStructList(this.sytaxTree.structs);
    }

    get enumList(): Enum[] {
        let enums = this.sytaxTree.enums.concat(this.getEnumInsideStructs(this.sytaxTree.structs))
        return enums;
    }

    private getStructList(structs: Struct[]): Struct[] {
        let structsList: Struct[] = [];
        for (const struct of structs) {
            structsList.push(struct);
            structsList = structsList.concat(this.getStructList(struct.subStructs));
        }
        return structsList;
    }

    private getEnumInsideStructs(structs: Struct[]): Enum[] {
        let enums: Enum[] = [];
        for (const struct of structs) {
            enums = enums.concat(struct.enums);
            enums = enums.concat(this.getEnumInsideStructs(struct.subStructs));
        }
        return enums;
    }
}