import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  localLoginModel = {
    email:'',
    password:''
  }
  environment:String;
  public localLoginForm:FormGroup;
  errorMessage: any = {};
  constructor(public fb: FormBuilder) {
  	this.localLoginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

}
