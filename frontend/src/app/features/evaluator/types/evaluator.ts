import { File as FileModel } from "@src/app/features/evaluator/models/file";

export type EvaluateBody = {
  statement:string;
  noparse:boolean;
  file_id:number|null;
  expression_id:number|null;
};

export type EvaluateResponse = {
  file:ConstructorParameters<typeof FileModel>[0];
};

export type LoadBody = {
  fileId:number;
};

export type LoadResponse = {
  file:ConstructorParameters<typeof FileModel>[0];
};

export type GetFigureBody = {
  name:string;
};

export type GetFigureResponse = File;

export type ErrorResponse = {
  error: {message:string};
}

export type OperatorSelection = {
  target:HTMLInputElement;
  operator:string;
}





