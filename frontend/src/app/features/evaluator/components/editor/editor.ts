
import { Component, inject, OnInit } from '@angular/core';
import { TOOL_TYPE } from '@src/angular/types';
import { EDITOR_IMPORTS } from '@src/app/features/evaluator/components/editor/editor.imports';
import { Document } from '@src/app/features/evaluator/components/tools/components/document/document';
import { Mode } from '@src/app/features/evaluator/components/tools/components/mode/mode';
import { SetTheoryOperators } from '@src/app/features/evaluator/components/tools/components/set-theory-operators/set-theory-operators';
import { Variables } from '@src/app/features/evaluator/components/tools/components/variables/variables';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';
import { EvaluatorBackend } from '@src/app/features/evaluator/services/evaluator-backend';


@Component({
  imports:EDITOR_IMPORTS,
  providers:[EditorContext,EvaluatorBackend],
  selector: 'app-editor',
  styleUrl: './editor.scss',
  templateUrl: './editor.html',
})
export class Editor implements OnInit {
  public leftToolbarTools:TOOL_TYPE[] = [
    SetTheoryOperators

  ];
  public centerToolbarTools:TOOL_TYPE[] = [
    Document
  ];
  public rightToolbarTools:TOOL_TYPE[] = [
    Mode,
    Variables
  ];

  private context = inject(EditorContext);

  ngOnInit(): void {
    const fileId=history.state['fileId']
    this.context.init(fileId);
  }
}

