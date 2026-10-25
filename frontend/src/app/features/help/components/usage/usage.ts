import { Component, inject, OnInit, signal } from '@angular/core';
import { USAGE_IMPORTS } from '@src/app/features/help/components/usage/usage.imports';
import { Help } from '@src/app/features/help/services/help';
import { UsageResponse } from '@src/app/features/help/types/help';

@Component({
  imports: USAGE_IMPORTS,
  selector: 'app-usage',
  styleUrl: './usage.scss',
  templateUrl: './usage.html',
})
export class Usage implements OnInit {
  private help = inject(Help);

  public usageText = signal<string | null>(null);

  ngOnInit(): void {
    this.help.usage().subscribe({
      next:(response)=>this.handleUsageResponse(response),
    })
  }

  public handleUsageResponse(response:UsageResponse) {
    this.usageText.set(response);
  }
}
