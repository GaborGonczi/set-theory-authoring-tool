import { AfterViewInit, Component, computed, ElementRef, inject, Signal, ViewChild } from '@angular/core';
import { DocumentRow } from '@src/app/features/evaluator/components/tools/components/document/components/document-row/document-row';
import { DOCUMENT_IMPORTS } from '@src/app/features/evaluator/components/tools/components/document/document.imports';
import { Expression } from '@src/app/features/evaluator/models/expression';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';

@Component({
  imports: DOCUMENT_IMPORTS,
  selector: 'app-document',
  styleUrl: './document.scss',
  templateUrl: './document.html',
})
export class Document implements AfterViewInit {

  private context = inject(EditorContext);

  public rows:Signal<Array<Expression>>=computed(()=>
    this.context.getFile()?.getExpressions() ?? []
  );

  @ViewChild('document')
  public document!: ElementRef<HTMLElement>;

  @ViewChild('newRow')
  private newRow!:DocumentRow;

  public focusNewRow() {
    this.newRow.focus();
    this.document.nativeElement.scrollTo({
      top: this.document.nativeElement.scrollHeight,
      behavior: 'instant'
    });
  }

  ngAfterViewInit(): void {
    this.newRow.focus();
  }

}
