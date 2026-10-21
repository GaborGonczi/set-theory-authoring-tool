import {Component, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { File } from '@src/app/features/evaluator/models/file';
import { File as FileService } from '@src/app/features/files/services/file';
import { FILE_LIST_IMPORTS } from '@src/app/features/files/components/file-list/file-list.imports';
import {
  CopyBody,
  CopyResponse,
  DeleteBody,
  DeleteResponse,
  ErrorResponse,
  ExportBody,
  ExportResponse,
  GetExamplesByOthersResponse,
  GetMyFilesResponse,
  ImportBody,
  ImportResponse,
  UpdateExampleBody,
  UpdateExampleResponse,
} from '@src/app/features/files/types/file';
import { Router } from '@angular/router';
import { downloadBlob } from '@src/app/features/files/utils/download-blob';

@Component({
  imports: FILE_LIST_IMPORTS,
  selector: 'app-file-list',
  styleUrl: './file-list.scss',
  templateUrl: './file-list.html',
})
export class FileList implements OnInit {
  private fileService = inject(FileService);
  private router = inject(Router);

  public myFiles: MatTableDataSource<File> = new MatTableDataSource<File>([]);
  public othersFiles: MatTableDataSource<File> = new MatTableDataSource<File>([]);

  public myDisplayedColums: string[] = ['id', 'created_at', 'updated_at', 'actions'];
  public othersDisplayedColums: string[] = ['id', 'created_at', 'updated_at', 'actions'];

  public myError = signal<string|null>(null);
  public othersError = signal<string|null>(null);
  public importError = signal<string|null>(null);



  ngOnInit(): void {
    this.fileService.getMyFiles().subscribe({
      next: (response) => this.handleGetMyFilesResponse(response),
      error: (error) => this.handleMyErrorResponse(error),
    });

    this.fileService.getExamplesByOthers().subscribe({
      next: (response) => this.handleGetExamplesByOthersResponse(response),
      error: (error) => this.handleOthersErrorResponse(error),
    });
  }

  public handleGetMyFilesResponse(response: GetMyFilesResponse) {
    this.myFiles.data = response.files.map((file)=>new File(file));
  }

  public handleGetExamplesByOthersResponse(response: GetExamplesByOthersResponse) {
    this.othersFiles.data = response.files.map((file)=>new File(file));
  }

  public handleMyErrorResponse(response: ErrorResponse) {
    this.myError.set(response.error.message);
  }

  public handleOthersErrorResponse(response: ErrorResponse) {
    this.othersError.set(response.error.message);
  }

  public updateExample(file: File) {
    let body: UpdateExampleBody = {
      file_id: file.getId(),
      example: !file.isExample(),
    };
    this.fileService.updateExample(body).subscribe({
      next: (response) => this.hadleUpdateExampleResponse(response),
      error: (error) => this.handleMyErrorResponse(error),
    });
  }

  public hadleUpdateExampleResponse(response: UpdateExampleResponse) {
    let responseFile=new File(response.file);

    let fileExist= this.myFiles.data.some(file=>{
      return file.getId()===responseFile.getId()
    })

    if (!fileExist) {
      this.myError.set('Ismeretlen hiba történt.');
      return;
    }

    this.myFiles.data = this.myFiles.data.map(item =>
      item.getId() === responseFile.getId() ? responseFile : item
    );
  }

  public load(id: number) {
    this.router.navigateByUrl('/evaluator', { state: { fileId: id } });
  }

  public delete(id: number) {
    let body: DeleteBody = {
      file_id: id,
    };
    this.fileService.delete(body).subscribe({
      next: (response) => this.hadleDeleteResponse(id, response),
      error: (error) => this.handleMyErrorResponse(error),
    });
  }

  public hadleDeleteResponse(id: number, response: DeleteResponse) {
    this.myFiles.data = this.myFiles.data.filter((file) => file.getId() != id);
  }

  public export(id: number) {
    let body: ExportBody = {
      file_id: id,
    };
    this.fileService.export(body).subscribe({
      next: (response) => this.hadleExportResponse(response),
      error: (error) => this.handleMyErrorResponse(error),
    });
  }

  public hadleExportResponse(response: ExportResponse) {
    let blob = response.body;

    if (!blob) {
      this.myError.set('Sikertelen exportálás.');
      return;
    }

    let disposition = response.headers.get('Content-Disposition');
    let filename = disposition?.match(/filename="?([^";]+)"?/i)?.[1] ?? 'export.txt';
    downloadBlob(blob, filename);
  }

  public copy(id: number) {
    let body: CopyBody = {
      file_id: id,
    };
    this.fileService.copy(body).subscribe({
      next: (response) => this.hadleCopyResponse(response),
      error: (error) => this.handleOthersErrorResponse(error),
    });
  }

  public hadleCopyResponse(response: CopyResponse) {
    this.myFiles.data = [...this.myFiles.data,new File(response.file)];
  }

  public import(event: Event) {
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      this.myError.set('Sikertelen importálás.');
      return;
    }
    let body: ImportBody = {
      file:file
    }
    this.fileService.import(body).subscribe({
      next:(response)=>this.handleImportResponse(response),
      error:(error)=>this.handleImportErrorResponse(error),
    });
  }

  public handleImportResponse(response:ImportResponse) {
    if(!response.file) {
      this.myError.set(response.message);
      return;
    };
    let file:File = new File(response.file)
    this.router.navigateByUrl('/evaluator', { state: { fileId: file.getId() } });
  }

  public handleImportErrorResponse(response: ErrorResponse) {
    this.importError.set(response.error.message);
  
  }
}
