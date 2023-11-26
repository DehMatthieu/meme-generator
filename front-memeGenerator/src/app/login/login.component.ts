import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  async ngAfterViewInit() {
    this.checkCookie()
  }
  async checkCookie() {
    if (getCookie("login") != undefined) {
      let response = await CookieCheck.checkCookie(<string>getCookie("login"));
      if(response.startsWith("valid cookie")){
        setCookie("id",response.substring(response.indexOf("id :")+4, response.length),365);
        this.router.navigate(['/load-photo']);
      }
    }
  }
  async onLogin() {
    let response = await CredentialsCheck.uploadCredentials(this.loginForm.value.username, this.loginForm.value.password)
    if(response.startsWith("valid credentials")){
      setCookie("login",response.substring(response.indexOf("cookie :")+8, response.length),365);
      this.router.navigate(['/load-photo']);
    } else {
        let errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
        errorMessage.textContent = "Identifiants incorrects";
        errorMessage.style.display = 'block';
    }
  }

  onSignup(){
    this.router.navigate(['/signup']);
  }
}

class CredentialsCheck {
  static async uploadCredentials(loginString: string, passwordString: string) {
    try {
      const credentialsData = {
        login : loginString,
        password : passwordString
      };

      const response = await fetch('http://localhost:8080/users/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentialsData),
      });
      if (response.ok) {
        const responseData = await response.text();
        return responseData
      } else {
        throw new Error('Erreur lors de la requête POST');
        return "error"
      }
    } catch (error) {
      console.error('Erreur : ', error);
      return "error"
    }
  }
}

class CookieCheck {
  static async checkCookie(cookieString: string) {
    try {
      const cookieData = {
        cookie : cookieString
      };

      const response = await fetch('http://localhost:8080/users/checkcookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cookieData),
      });
      if (response.ok) {
        const responseData = await response.text();
        return responseData
      } else {
        throw new Error('Erreur lors de la requête POST');
        return "error"
      }
    } catch (error) {
      console.error('Erreur : ', error);
      return "error"
    }
  }
}
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(cookieName: string): string | undefined {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return undefined;
}
