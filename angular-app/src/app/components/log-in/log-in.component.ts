import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginModel = {
    username:'',
    password:''
  }
  environment:String;
  public loginForm:FormGroup;
  errorMessage: any = {};
  
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public loginService:LoginService
    ) {
  	this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onsubmit() {
    if(this.loginForm.controls.username.status=='VALID' && this.loginForm.controls.password.status=='VALID'){
      this.loginService.login(this.loginModel).subscribe(
        response => {
          console.log(response);
          if(response.data.token != ''){
              localStorage.setItem('userToken',response.data.token);
              this.router.navigate(['/dashboard/']);
          } else {
              //this._notificationService.add(new Notification('error', response.message));
          }
      },
      error => {
  
      });
    }

  }

}
