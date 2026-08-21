import { Component, signal } from '@angular/core';
import { APP_IMPORTS } from '@src/app/app.imports';

@Component({
  imports: APP_IMPORTS,
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular');
}
