import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService : RegisterServiceService
  ) { }
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      github: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fval() { return this.registerForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.registerService.registerUser(this.registerForm.get("firstName").value,
                                      this.registerForm.get("password").value,
                                      this.registerForm.get("email").value,
                                      this.registerForm.get("github").value)
    .then( () => {
      console.log("success");
    }
      
    ).catch((err) => {
      console.log(err);
    })
  }

}