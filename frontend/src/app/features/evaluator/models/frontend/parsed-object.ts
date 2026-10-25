import { Point } from "@src/app/features/evaluator/models/frontend/point";
import { Set } from "@src/app/features/evaluator/models/frontend/set";

export interface ParsedObjectOperations {
   toParsedObject():ParsedObject;
}

export interface Stringable {
   toString():string;
}

interface PointParsedObject {
  name: 'Point';
  x: number;
  y: number;
}

interface SetParsedObject {
  name: 'Set';
  elements: ParsedElement[];
}

export type ParsedObject = PointParsedObject | SetParsedObject;

export type ParsedElement = ParsedObject | number | string;

const FRONTEND_OBJECTS = [
    Set,
    Point
] as const;

type FrontendObjectConstructor = typeof FRONTEND_OBJECTS[number]

type FrontendObjects = InstanceType<FrontendObjectConstructor>

export type ResultElement = FrontendObjects | number | string; 

