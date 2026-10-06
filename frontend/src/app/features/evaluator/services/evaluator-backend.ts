import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '@src/app/api/api';
import { EvaluateBody, EvaluateResponse, GetFigureBody, GetFigureResponse, LoadBody, LoadResponse } from '@src/app/features/evaluator/types/evaluator';
import { Observable } from 'rxjs';


@Service({
  autoProvided: false,
})
export class EvaluatorBackend {
  private http = inject(HttpClient)

  public evaluate(body:EvaluateBody) : Observable<EvaluateResponse> {
    return this.http.post<EvaluateResponse>(API.EXPRESSION.EVALUATE,body);
  }
  public load(body:LoadBody) : Observable<LoadResponse> {
    return this.http.post<LoadResponse>(API.FILE.LOAD,body);
  }
  public getFigure(body:GetFigureBody) : Observable<GetFigureResponse> {
    return this.http.post<GetFigureResponse>(API.EXPRESSION.GET_FIGURE,body,{responseType:"blob"});
  }
}
