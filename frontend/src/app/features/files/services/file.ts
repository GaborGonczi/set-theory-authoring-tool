import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '@src/app/api/api';
import {
  CopyBody,
  CopyResponse,
  DeleteBody,
  DeleteResponse,
  ExportBody,
  ExportResponse,
  GetExamplesByOthersResponse,
  GetMyFilesResponse,
  ImportBody,
  ImportResponse,
  UpdateExampleBody,
  UpdateExampleResponse,
} from '@src/app/features/files/types/file';
import { Observable } from 'rxjs';

@Service()
export class File {
  private http = inject(HttpClient);

  public getMyFiles(): Observable<GetMyFilesResponse> {
    return this.http.post<GetMyFilesResponse>(API.FILE.GET_MY_FILES, null);
  }

  public getExamplesByOthers(): Observable<GetExamplesByOthersResponse> {
    return this.http.post<GetExamplesByOthersResponse>(API.FILE.GET_EXAMPLES_BY_OTHERS, null);
  }

  public copy(body: CopyBody): Observable<CopyResponse> {
    return this.http.post<CopyResponse>(API.FILE.COPY, body);
  }

  public delete(body: DeleteBody): Observable<DeleteResponse> {
    return this.http.post<DeleteResponse>(API.FILE.DELETE, body);
  }

  public export(body: ExportBody): Observable<ExportResponse> {
    return this.http.post(API.FILE.EXPORT, body, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  public import(body: ImportBody): Observable<ImportResponse> {
    const formData = new FormData();

    formData.append('file', body.file);

    return this.http.post<ImportResponse>(API.FILE.IMPORT, formData);
  }

  public updateExample(body: UpdateExampleBody): Observable<UpdateExampleResponse> {
    return this.http.post<UpdateExampleResponse>(API.FILE.UPDATE_EXAMPLE, body);
  }
}
