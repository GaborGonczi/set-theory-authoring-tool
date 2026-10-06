import { Component, computed, inject, Signal } from '@angular/core';
import { VARIABLES_IMPORTS } from '@src/app/features/evaluator/components/tools/components/variables/variables.imports';
import { ParsedElement, ParsedObject } from '@src/app/features/evaluator/models/frontend/parsed-object';
import { Point } from '@src/app/features/evaluator/models/frontend/point';
import { Set } from '@src/app/features/evaluator/models/frontend/set';
import { Variable } from '@src/app/features/evaluator/models/variable';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';
import { getObjectElement } from '@src/app/features/evaluator/utils/get-object-element';

@Component({
  imports: VARIABLES_IMPORTS,
  selector: 'app-variables',
  styleUrl: './variables.scss',
  templateUrl: './variables.html',
})
export class Variables {

  private context = inject(EditorContext);

  public variables:Signal<Array<Variable>>=computed(()=>
    this.context.getFile()?.getVariables() ?? []
  );

  public displayValue(value:string) {
    let parsed:ParsedObject=JSON.parse(value);

    switch (parsed.name) {
      case 'Set':
        return new Set(parsed.elements.map((element:ParsedElement)=>getObjectElement(element)));
      case 'Point':
        return new Point(parsed.x,parsed.y)
    }
  }

}
