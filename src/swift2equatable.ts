import { Struct, Enum, EnumCase, EnumCaseParameter } from "./types";
import { captalizeFirstLetter } from "./util";

export class swift2equatableConverter {
    private static equatableDeclartion: string = "Equatable";
    private static visibilityDeclaration: string = "";

    public static convert(structs: Struct[], enums: Enum[], usePublic: boolean = false, useRetroactive: boolean = false): string {
        this.defineEquatableAndVisibility(usePublic, useRetroactive);
        let equatables: string[] = [];
        for (const struct of structs) {
            if (struct.property.length == 0) continue;
            equatables.push(this.convertStruct(struct));
        }
        for (const enun of enums) {
            if (enun.cases.length == 0) continue;
            equatables.push(this.convertEnum(enun));
        }
        return equatables.join("\n\n");
    }

    private static defineEquatableAndVisibility(usePublic: Boolean, useRetroactive: boolean) {
        if (usePublic) this.visibilityDeclaration = "public ";
        if (useRetroactive) this.equatableDeclartion = "@retroactive Equatable";
    }

    private static convertStruct(struct: Struct): string {
        let equatable: string[] = [];
        equatable.push(`extension ${struct.fullName}: ${this.equatableDeclartion} {`);
        equatable.push(`\t${this.visibilityDeclaration}static func == (lhs: ${struct.fullName}, rhs: ${struct.fullName}) -> Bool {`);
        let properties: string[] = [];
        for (const property of struct.property) {
            properties.push(`lhs.${property.name} == rhs.${property.name}`);
        }
        properties[0] = `\t\treturn ${properties[0]}`;
        equatable.push(`${properties.join("\n\t\t&& ")}`);
        equatable.push(`\t}`);
        equatable.push(`}`);
        return equatable.join("\n");
    }

    private static convertEnum(enun: Enum): string {
        let equatable: string[] = [];
        equatable.push(`extension ${enun.name}: ${this.equatableDeclartion} {`);
        equatable.push(`\t${this.visibilityDeclaration}static func == (lhs: ${enun.name}, rhs: ${enun.name}) -> Bool {`);
        equatable.push(`\t\tswitch (lhs, rhs) {`);
        let cases: string[] = [];
        for (const caze of enun.cases) {
            cases.push(this.convertEnumCase(caze));
        }
        equatable.push(`${cases.join("\n")}`);
        equatable.push(`\t\tdefault:`);
        equatable.push(`\t\t\treturn false`);
        equatable.push(`\t\t}`);
        equatable.push(`\t}`);
        equatable.push(`}`);
        return equatable.join("\n");
    }

    private static convertEnumCase(caze: EnumCase): string {
        let equatable: string[] = [];
        if (caze.parameters.length == 0) {
            equatable.push(`\t\tcase (.${caze.name}, .${caze.name}):`);
            equatable.push(`\t\t\treturn true`);
            return equatable.join("\n");
        }
        const lhsParameters = this.convertEnumCaseParameterDefine(caze.parameters, "lhs");
        const rhsParameters = this.convertEnumCaseParameterDefine(caze.parameters, "rhs");
        equatable.push(`\t\tcase (.${caze.name}(${lhsParameters}), .${caze.name}(${rhsParameters})):`);
        equatable.push(`\t\t\treturn ${this.convertEnumCaseParameterCompare(caze.parameters)}`);
        return equatable.join("\n");
    }

    private static convertEnumCaseParameterDefine(params: EnumCaseParameter[], prefix: String): string {
        let equatable: string[] = [];
        for (const param of params) {
            equatable.push(`let ${prefix}${captalizeFirstLetter(param.name ?? param.type)}`);
        }
        return equatable.join(", ");
    }

    private static convertEnumCaseParameterCompare(params: EnumCaseParameter[]): string {
        let equatable: string[] = [];
        for (const param of params) {
            let paramName = captalizeFirstLetter(param.name ?? param.type)
            equatable.push(`lhs${paramName} == rhs${paramName}`);
        }
        return equatable.join(" && ");
    }
}