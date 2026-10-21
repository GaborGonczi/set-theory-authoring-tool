import { inject, Service, signal } from '@angular/core';
import { File } from '@src/app/features/evaluator/models/file';
import { EvaluatorBackend } from '@src/app/features/evaluator/services/evaluator-backend';
import {
  EvaluateBody,
  GetFigureBody,
  LoadBody,
  OperatorSelection,
} from '@src/app/features/evaluator/types/evaluator';

@Service({
  autoProvided: false,
})
export class EditorContext {
  private backendService = inject(EvaluatorBackend);
  private noparse = signal(false);
  private fileId: number | null = null;
  private file = signal<File | null>(null);
  private error: string | null = null;
  private operator = signal<string | null>(null);
  private activeInput = signal<HTMLInputElement | null>(null);

  public init(fileId: number | null) {
    this.fileId = fileId;
    if (this.fileId) {
      let body = {} as LoadBody;
      body.file_id = this.fileId;
      this.backendService.load(body).subscribe({
        next: (response) => this.setFile(new File(response.file)),
        error: (error) => this.setError(error),
      });
    }
  }

  public sendEvaluateRequest(body: EvaluateBody) {
    return this.backendService.evaluate(body);
  }

  public sendGetFigureRequest(body: GetFigureBody) {
    return this.backendService.getFigure(body);
  }

  public getNoParse(): boolean {
    return this.noparse();
  }

  public setNoParse(value: boolean): void {
    this.noparse.set(value);
  }

  public getFile() {
    return this.file();
  }

  public setFile(file: File) {
    this.file.set(file);
  }

  public getError(): string | null {
    return this.error;
  }

  public setError(error: string): void {
    this.error = error;
  }

  public setOperator(operator: string|null): void {
    this.operator.set(operator);
  }

  public getOperator(): string | null {
    return this.operator();
  }

  public setActiveInput(activeInput: HTMLInputElement|null): void {
    this.activeInput.set(activeInput);
  }

  public getActiveInput(): HTMLInputElement | null {
    return this.activeInput();
  }
}
