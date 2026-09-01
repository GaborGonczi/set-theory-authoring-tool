import { Component } from '@angular/core';
import { DASHBOARD_IMPORTS } from '@src/app/features/dashboard/components/dashboard/dashboard.imports';

@Component({
  imports: DASHBOARD_IMPORTS,
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
