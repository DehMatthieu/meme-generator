import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  signupAttempted: boolean = false;
  signupSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  onSignup() {
    if (this.signupForm.valid) {
      CredentialsUpload.uploadCredentials(this.signupForm.value.username, this.signupForm.value.password)
      this.signupSuccess = true;
      this.signupAttempted = false;
    } else {
      this.signupAttempted = true;
    }
  }
  redirectToLogin() {
    // Redirection vers la page de connexion
    this.router.navigate(['/']); // Assure-toi d'avoir la route correspondante à ta page de connexion
  }
}

class CredentialsUpload {
  static async uploadCredentials(loginString: string, passwordString: string) {
    try {
      const credentialsData = {
        login : loginString,
        password : passwordString
      };

      const response = await fetch('http://localhost:8080/users/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentialsData),
      });

    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
}
