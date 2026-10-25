import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '@src/app/api/api';
import { InfoResponse } from '@src/app/features/profile/types/profile';
import { Observable } from 'rxjs';

@Service()
export class Profile {
    private http = inject(HttpClient);

    public info(): Observable<InfoResponse> {
      return this.http.post<InfoResponse>(API.PROFILE.INFO,null)
    }
}
