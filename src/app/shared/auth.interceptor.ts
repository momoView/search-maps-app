import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import * as fromSM from '../search-maps/store/search-maps.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromSM.FeatureState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'https://proud-limiter-210411.firebaseio.com/places.json') {
      return this.store.select('auth').pipe(take(1), switchMap(
        (authState) => {
          const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
          return (next.handle(copiedReq));
        }
      ));
    } else {
      return (next.handle(req));
    }
  }
}
