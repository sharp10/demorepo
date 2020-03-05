// Use the @Injectable decorator for your Constants class
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Constants {
	baseUrl:String='';
      constructor(
      ) {
		 this.baseUrl = "http://localhost:3000";
      }

      prepareOptions(): any {
            let headers = new HttpHeaders();
            var token ='';
			headers = headers.set('Content-Type', 'application/json')
            if(!token || token == ''){
                  token = localStorage.getItem("userToken") 
				  headers = headers.set('Authorization', `Bearer ${token}`)
            }     
            return { headers };
      }

      getBearerToken(): any {
		var token ='';
		if(!token || token == ''){
			  token = localStorage.getItem("userToken")  
		}
		return `Bearer ${token}`;
      }
}
