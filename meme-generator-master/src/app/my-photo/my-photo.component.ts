import { Component, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.css']
})
export class MyPhotoComponent implements AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngAfterViewInit() {
    await this.checkCookie()
    const imageListElement = document.getElementById('imageList');

    // @ts-ignore
    imageListElement.style.paddingLeft = '10%';
    var userId: number = +<string>getCookie("id");
    let imageList = await UserImages.getAll(userId);
    afficherImages(imageList);

    const createMeme = document.getElementById('createMeme');
    // @ts-ignore
    createMeme.addEventListener('click', () => {
      this.router.navigate(['/load-photo']);
    });

    const sharedMeme = document.getElementById('sharedMeme');
    // @ts-ignore
    sharedMeme.addEventListener('click', () => {
      this.router.navigate(['/list-photo']);
    });
  }
  async checkCookie() {
    if (getCookie("login") != undefined) {
      let response = await CookieCheck.checkCookie(<string>getCookie("login"));
      if(response.startsWith("valid cookie")){
        setCookie("id",response.substring(response.indexOf("id :")+4, response.length),365);
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

}

class UserImages {
  static async getAll(userId: number) {
    try {
      const requestData = {
        id : userId
      };
      const response = await fetch('http://localhost:8080/memes/userimages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const responseData = await response.json();
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


function afficherImages(imagesList: string[]): void {
  const imageListElement = document.getElementById('imageList');

  // Parcourt la liste d'images Base64 et les affiche dans la page
  imagesList.forEach((imageBase64: string) => {
    const container = document.createElement('div');
    const imageElement = container.appendChild(document.createElement('img'));
    imageElement.src = imageBase64;
    imageElement.style.width = '400px'; // Ajustez la taille des images si nécessaire
    imageElement.style.margin = '10px'; // Espacement entre les images

    const buttonContainer = container.appendChild(document.createElement('div'));

    const buttonElement = buttonContainer.appendChild(document.createElement('button'));
    buttonElement.innerText = "Télécharger";
    buttonElement.className = "btn btn-success";
    buttonElement.style.borderRadius="0"
    buttonElement.style.borderColor= "#0d6efd"
    buttonElement.style.background = "#0d6efd"


    const deleteButtonElement = buttonContainer.appendChild(document.createElement('button'));
    deleteButtonElement.innerText = "Supprimer";
    deleteButtonElement.className = "btn btn-danger float-end";
    deleteButtonElement.style.borderRadius="0"
    deleteButtonElement.style.borderColor= "red"
    deleteButtonElement.style.background = "red"

    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.borderStyle = "solid"
    container.style.borderColor= "#0d6efd"
    container.style.margin = "10px"

    deleteButtonElement.addEventListener('click', () => {
      DeleteImage.uploadData(imageBase64, <string>getCookie('login'));
    });


    buttonElement.addEventListener('click', () => {
      // Créer un élément <a> pour le téléchargement
      const downloadLink = document.createElement('a');
      downloadLink.href = imageBase64; // Définir le lien de téléchargement
      downloadLink.download = 'image.png'; // Nom du fichier à télécharger

      // Ajouter l'élément <a> à la page et simuler le clic pour démarrer le téléchargement
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Nettoyer : retirer l'élément <a> de la page après le téléchargement
      document.body.removeChild(downloadLink);
    });

    // @ts-ignore
    imageListElement.appendChild(container);
  });

}

class DeleteImage {
  static async uploadData(base64String: string, usercookie:string) {
    try {
      const imageData = {
        DataURL: base64String,
        usercookie: usercookie,
      };

      const response = await fetch('http://localhost:8080/memes/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });
      console.log(JSON.stringify(imageData));
      if (response.ok) {
        location.reload();
      } else {
        throw new Error('Erreur lors de la requête POST');
      }
    } catch (error) {
      console.error('Erreur : ', error);
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

