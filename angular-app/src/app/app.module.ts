import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'; //needed for Adal Service
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule, FormBuilder }    from '@angular/forms';
import { LoginService } from './services/login.service';
import { NotesService } from './services/notes.service';
import { TokenInterceptor } from './token.interceptor';
import { Constants } from './constants';

import { AuthGuardService }  from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi   : true,
    },
    FormBuilder,LoginService,NotesService,Constants,AuthGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
