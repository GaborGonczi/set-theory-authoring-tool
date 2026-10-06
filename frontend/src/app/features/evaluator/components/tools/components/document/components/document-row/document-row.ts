import { Component, effect, ElementRef, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { DOCUMENT_ROW_IMPORTS } from '@src/app/features/evaluator/components/tools/components/document/components/document-row/document-row.imports';
import { Expression } from '@src/app/features/evaluator/models/expression';
import { File } from '@src/app/features/evaluator/models/file';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';
import { ErrorResponse, EvaluateBody, EvaluateResponse, GetFigureBody, GetFigureResponse } from '@src/app/features/evaluator/types/evaluator';
import { validate, version } from 'uuid';

@Component({
  imports: DOCUMENT_ROW_IMPORTS,
  selector: 'app-document-row',
  styleUrl: './document-row.scss',
  templateUrl: './document-row.html',
})
export class DocumentRow implements OnChanges {
  private context = inject(EditorContext);

  @Input() 
  public expression!: Expression;

  @Output() 
  public evaluationCompleted = new EventEmitter<void>()

  private insertOperatorEffect = effect(()=>this.insertOperator())


  @ViewChild('newInput')
  public newInput!:ElementRef<HTMLInputElement>;

  public image = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {

   if(changes['expression']&&changes['expression']['currentValue']){
    this.expression=new Expression(changes['expression']['currentValue'])
   }
   if(this.isImage()) {
    this.loadImage(this.expression.getResult())
   }
  }

  public sendExpression(value: string): void {
    let body: EvaluateBody;
    if (this.isNew()) {
      body = this.createRequestBodyForANewExpression(value);
    } else {
      body = this.createRequestBodyForAnExistedExpression(value);
    }

    this.context.sendEvaluateRequest(body).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error),
    });
  }

  public storeInput(target:EventTarget){
    this.context.setActiveInput(target as HTMLInputElement);  
  }

  private createRequestBodyForANewExpression(statement: string) {
    let body: EvaluateBody = {
      file_id: this.context.getFile()?.getId() ?? null,
      expression_id: null,
      noparse: this.context.getNoParse(),
      statement: statement,
    };
    return body;
  }

  private insertOperator(){
    let operator = this.context.getOperator();
    let input = this.context.getActiveInput(); 
    if(!operator||!input) {
      return;
    }
    this.context.setOperator(null);
    this.context.setActiveInput(null);
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? start;
    input.value=String.prototype.concat(input.value.slice(0,start),operator,input.value.slice(end));
    input.focus();
    

  }

  private createRequestBodyForAnExistedExpression(statement: string) {
    let body: EvaluateBody = {
      file_id: null,
      expression_id: this.expression.getId(),
      noparse: this.context.getNoParse(),
      statement: statement,
    };
    return body;
  }

  public isNew() {
    return this.expression === undefined;
  }

  public isImage() {
    return validate(this.expression.getResult())&&version(this.expression.getResult())===7;
  }

  public loadImage(name:string) {
    let body: GetFigureBody = {
      name:name
    }
    this.context.sendGetFigureRequest(body).subscribe({
      next:(response)=>this.handleGetFigureSuccess(response),
      error:(error)=>this.handleGetFigureError(error)
    })

  }

  public focus() {
    this.newInput.nativeElement.focus();
  }

  public handleSuccess(response: EvaluateResponse) {
    this.context.setFile(new File(response.file));
    this.clearInput();
    this.evaluationCompleted.emit();

  }

  public handleError(response: ErrorResponse) {
    this.context.setError(response.error.message);
    this.clearInput();
  }

  public handleGetFigureSuccess(response: GetFigureResponse) {
    this.image.set(URL.createObjectURL(response));
    this.clearInput();
    this.evaluationCompleted.emit();

  }

  public handleGetFigureError(error: ErrorResponse) {
    this.context.setError(error.error.message);
    this.clearInput();
  }

  private clearInput() {
    if(this.isNew()){
      this.newInput.nativeElement.value='';
    }
    
  }
}
