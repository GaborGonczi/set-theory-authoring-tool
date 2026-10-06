import { ParsedObject, ParsedObjectOperations, Stringable } from "@src/app/features/evaluator/models/frontend/parsed-object";

export class Set extends globalThis.Set implements ParsedObjectOperations,Stringable {
    static BUILTIN_TYPES=['undefined','symbol','string','object','number','function','boolean','bigint'];
    toParsedObject(): ParsedObject {
        return {
            name:'Set',
            elements:Array.from(this.values()),
        };
    }
    override toString(): string {
        let values=Array.from(this.values());
        let isUserDefinedTypedValues=values.every(value=>{return !Set.BUILTIN_TYPES.includes(typeof value)});
        if(isUserDefinedTypedValues){
            values=values.map(value=>{
                return typeof value.toString=='function'?value.toString():console.error("Set toString error");
            });
        }
        return `{${values.join(',')}}`;
        
    }

}

