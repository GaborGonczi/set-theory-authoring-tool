import { Component, Input } from '@angular/core';
import { TOOL_TYPE } from '@src/angular/types';
import { TOOL_IMPORTS } from '@src/app/features/evaluator/components/tools/tool/tool.imports';

@Component({
  imports: TOOL_IMPORTS,
  selector: 'app-tool',
  styleUrl: './tool.scss',
  templateUrl: './tool.html',
})
export class Tool {

  @Input() public component!:TOOL_TYPE

}
