import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '@src/app/api/api';
import { UsageResponse } from '@src/app/features/help/types/help';
import { Observable } from 'rxjs';

@Service()
export class Help {
    private http = inject(HttpClient);

    public usage(): Observable<UsageResponse> {
        return this.http.post<UsageResponse>(API.HELP.USAGE,null,{responseType:'text'});
    }

}
