import { Component, inject } from '@angular/core';
import { MODE_IMPORTS } from '@src/app/features/evaluator/components/tools/components/mode/mode.imports';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';

@Component({
  imports: MODE_IMPORTS,
  selector: 'app-mode',
  styleUrl: './mode.scss',
  templateUrl: './mode.html',
})
export class Mode {
  public context = inject(EditorContext);

  public changeMode(checked:boolean){

    this.context.setNoParse(checked);
    let activeInput=this.context.getActiveInput();
    if(activeInput) {
      activeInput.focus();
    }
  }

}
