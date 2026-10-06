import { Component, HostBinding, inject, Input } from '@angular/core';
import { TOOL_TYPE } from '@src/angular/types';
import { TOOLBAR_IMPORTS } from '@src/app/features/evaluator/components/toolbar/toolbar.imports';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';

type Position = 'left' | 'center' | 'right';

@Component({
  imports: TOOLBAR_IMPORTS,
  selector: 'app-toolbar',
  styleUrl: './toolbar.scss',
  templateUrl: './toolbar.html',
})
export class Toolbar {
  @Input() public tools: TOOL_TYPE[] = [];

  @Input() public position: Position = 'left';

  @HostBinding('style.order')
  get order() {
    switch (this.position) {
      case 'left':
        return 0;
      case 'center':
        return 1;
      case 'right':
        return 2;
    }
  }
  @HostBinding('style.background-color')
  get backgroundColor(): string {
    switch (this.position) {
      case 'left':
      case 'right':
        return 'var(--mat-sys-surface-container)';

      case 'center':
        return 'var(--mat-sys-surface)';

      default:
        return 'transparent';
    }
  }
  private context = inject(EditorContext);
}
