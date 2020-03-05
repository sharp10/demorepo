import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
import { Constants} from '../constants'
@Injectable()
export class NotesService {
  baseurl:String='http://localhost:3000/'
  constructor(
    private http: HttpClient,
    private constants:Constants
  	) { }

    getNotes() {
        return this.http.get<any>(this.constants.baseUrl+'/api/notes',{}).pipe(
            map(response => {
                console.log(response);
                return response;
            })
          )
    }

    saveNotes(notes) {
      if(notes.id == ''){
        return this.http.post<any>(this.constants.baseUrl+'/api/notes', notes).pipe(
          map(response => {                
              return response;
          })
        )
      }else{
        return this.http.put<any>(this.constants.baseUrl+'/api/notes/'+notes.id, notes).pipe(
          map(response => {                
              return response;
          })
        )
      }        
    }

    deleteNotes(noteId) {
      return this.http.delete<any>(this.constants.baseUrl+'/api/notes/'+noteId).pipe(
          map(response => {              
              return response;
          })
        )
  }

}
