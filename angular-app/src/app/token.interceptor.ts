import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public constants: Constants) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: this.constants.getBearerToken()
      }
    });
    return next.handle(request);
    
  }
  
}