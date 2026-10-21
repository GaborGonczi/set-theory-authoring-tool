import { HttpResponse } from "@angular/common/http";
import { File as FileModel } from "@src/app/features/evaluator/models/file";

export type CopyBody = {
  file_id: number;
};

export type CopyResponse = {
  message: string;
  file: ConstructorParameters<typeof FileModel>[0];
};

export type DeleteBody = {
  file_id: number;
};

export type DeleteResponse = {
  message: string;
};

export type ExportBody = {
  file_id: number;
};

export type ExportResponse = HttpResponse<Blob>;

export type ImportBody = {
  file: File;
};

export type ImportResponse = {
  message: string;
  file?: ConstructorParameters<typeof FileModel>[0];
};


export type UpdateExampleBody = {
  file_id: number;
  example: boolean;
};

export type UpdateExampleResponse = {
  message: string;
  file: ConstructorParameters<typeof FileModel>[0];
};


export type GetMyFilesResponse = {
  files: Array<ConstructorParameters<typeof FileModel>[0]>;
};

export type GetExamplesByOthersResponse = {
  files: Array<ConstructorParameters<typeof FileModel>[0]>;
};

export type ErrorResponse = {
  error: {message:string};
}