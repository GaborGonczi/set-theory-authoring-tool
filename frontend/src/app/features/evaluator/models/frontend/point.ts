import { ParsedObject, ParsedObjectOperations, Stringable } from "@src/app/features/evaluator/models/frontend/parsed-object";

export class Point implements ParsedObjectOperations,Stringable {
    private x:number;
    private y:number;

    constructor(x:number,y:number) {
       this.x=x;
       this.y=y;
    }
    toParsedObject(): ParsedObject {
        return {
            name:'Point',
            x:this.x,
            y:this.y
        };
    }
    toString(): string {
        return `[${this.x}, ${this.y}]`;
    }

}