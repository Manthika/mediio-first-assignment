import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import { User } from 'src/app/user.model';
import { SignInService } from 'src/app/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  users?: User[];
  currentUser?: User;
  submitted = false;
  isLoginSuccess = false;
  isSignInDisabled = true;

  constructor(
    private signInService: SignInService,
    public fb: FormBuilder
    ) { }
  
    formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  
    get f(){
      return this.formData.controls;
    }

  ngOnInit(): void {
    this.isSignInDisabled = true;
    this.isLoginSuccess = false;
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.signInService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  authenticateUser(formData: any){
    this.submitted = true;
    this.isLoginSuccess = false;
    console.log(formData);
    
    this.users?.forEach(user => {
      if(user.email === formData.email && user.password === formData.password){
        console.log(user);
        this.currentUser = user;
        this.isLoginSuccess = true;
      }else{
        console.log("User not found!");
        this.isLoginSuccess = false;
      }
    });
  }

  onEmailChange(event: any){
    console.log(event.target.value);
    this.isSignInDisabled = false;
  }

}
