import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AppUser } from '../Model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


userFormGroup!:FormGroup ;
errorMessage!: any ;

constructor( private fb : FormBuilder , private authService:AuthenticationService , private router : Router )
{               }


ngOnInit() {
this.userFormGroup = this.fb.group({
username : this.fb.control("admin") ,
password : this.fb.control("1234")




}) ;   
}


handlelogin(){
  let username = this.userFormGroup.value.username    ;
  let password = this.userFormGroup.value.password ;
  this.authService.login(username,password).subscribe({
    next : (appUser : AppUser)=>{
     this.authService.authenticateUser(appUser).subscribe({
    next :  (data : boolean) =>{
  this.router.navigateByUrl("/admin") ;

  }
}) ; 
    },
error : (err)=>{
this.errorMessage=err ;
}
});
}}