import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
import { Constants} from '../constants'

@Injectable()
export class LoginService {
  redirectUrl: string;
  public isTokenisTaken:string = '';
  isToken:string = '';
  constructor(
  	private http: HttpClient,
    private constants:Constants
  	) { }

    login(user) {
      var baseUrl = this.constants.baseUrl+'/auth/login'
        return this.http.post<any>(baseUrl, user,{}).pipe(
            map(response => {
                
                return response;
            })
          )
    }
}
