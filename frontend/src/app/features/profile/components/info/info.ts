import { Component, inject, OnInit, signal } from '@angular/core';
import { INFO_IMPORTS } from '@src/app/features/profile/components/info/info.imports';
import { Profile } from '@src/app/features/profile/services/profile';
import { ProfileInfo  } from "@src/app/features/profile/models/profile-info";
import { ErrorResponse, InfoResponse } from '@src/app/features/profile/types/profile';

@Component({
  imports: INFO_IMPORTS,
  selector: 'app-info',
  styleUrl: './info.scss',
  templateUrl: './info.html',
})
export class Info implements OnInit {
  private profile = inject(Profile);
  public profileInfo = signal<ProfileInfo | null>(null);
  public error = signal<string | null>(null);
  
  ngOnInit(): void {
    this.profile.info().subscribe({
      next:(response)=>this.handleInfoResponse(response),
      error:(error)=>this.handleErrorResponse(error)
    })
  }


  public handleInfoResponse(response:InfoResponse) {
    this.profileInfo.set(new ProfileInfo(response.profileInfo));
    this.error.set(null);
  }

  public handleErrorResponse(response:ErrorResponse) {
    this.error.set(response.error.message);
    this.profileInfo.set(null);
  }

}
