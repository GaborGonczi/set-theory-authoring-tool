import { ParsedElement, ResultElement } from "@src/app/features/evaluator/models/frontend/parsed-object";
import { Point } from "@src/app/features/evaluator/models/frontend/point";
import { Set } from "@src/app/features/evaluator/models/frontend/set";

export function getObjectElement(element:ParsedElement):ResultElement{
    if(typeof element==="string" || typeof element==="number"){
        return element;
    }

    switch (element.name) {
      case 'Set':
        return new Set(element.elements);
      case 'Point':
        return new Point(element.x,element.y);
    }




}