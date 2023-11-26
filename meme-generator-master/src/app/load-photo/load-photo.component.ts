import { Component, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-load-photo',
  templateUrl: './load-photo.component.html',
  styleUrls: ['./load-photo.component.css']
})
export class LoadPhotoComponent implements AfterViewInit {
  imageUrl: string = '';
  texteEditable: fabric.IText | null = null;
  canvas: fabric.Canvas | null = null;
  couleurTexte: string = 'white'; // Couleur par défaut
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngAfterViewInit() {
    await this.checkCookie()
    this.canvas = new fabric.Canvas('canvas', {
      width: 400,
      height: 400,
    });
    const sharedMemes = document.getElementById('sharedMemes');
// @ts-ignore
    sharedMemes.addEventListener('click', () => {
      this.router.navigate(['/list-photo']);
    });

    const myMemes = document.getElementById('myMemes');
// @ts-ignore
    myMemes.addEventListener('click', () => {
      this.router.navigate(['/my-photo']);
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imageUrl = e.target.result as string;
          // Affichez l'image dans un élément <img>
          this.loadImage();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  loadImage() {
    if (this.canvas) {
      // Oui il y a deux images car sinon ça marchait pas je suis au bout de ma vie
      fabric.Image.fromURL(this.imageUrl, (img) => {
        // Vérifier que les propriétés width et height de l'image existent
        if (img.width !== undefined && img.height !== undefined) {
          const canvasWidth = this.canvas!.width || 0;
          const canvasHeight = this.canvas!.height || 0;

          // Calculer le rapport d'aspect de l'image
          const aspectRatio = img.width / img.height;

          // Ajuster les dimensions de l'image pour qu'elle s'adapte au cadre de 400x400 pixels
          let newWidth = canvasWidth;
          let newHeight = canvasWidth / aspectRatio;

          if (newHeight > canvasHeight) {
            newHeight = canvasHeight;
            newWidth = canvasHeight * aspectRatio;
          }

          img.scaleToWidth(newWidth);
          img.scaleToHeight(newHeight);

          const centerX = canvasWidth / 2;
          const centerY = canvasHeight / 2;

          img.set({
            left: centerX - newWidth / 2,
            top: centerY - newHeight / 2,
          });

          // Supprimer toutes les instances précédentes d'images sur le canevas
          this.canvas!.clear();


          this.canvas!.setBackgroundImage(img, this.canvas!.renderAll.bind(this.canvas!));
        }
      });
    }
  }


  ajouterTexte() {
    //if (this.texteEditable && this.canvas) {
    //  this.canvas.remove(this.texteEditable);
    //}

    this.texteEditable = new fabric.IText('Saisissez le texte', {
      left: this.canvas && this.canvas.width ? this.canvas.width / 2 : 0,
      top: this.canvas && this.canvas.height ? this.canvas.height / 2 : 0,
      fill: this.couleurTexte,
    });

    if (this.canvas) {
      this.canvas.add(this.texteEditable);
      this.canvas.setActiveObject(this.texteEditable);
      this.canvas.renderAll();
    }
  }


  sauvegarderTexte() {
    if (this.texteEditable && this.texteEditable.text) {
      // Créer un canevas temporaire
      const tempCanvas = new fabric.StaticCanvas(null, {
        width: this.texteEditable.width,
        height: this.texteEditable.height,
      });

      // Ajouter le texte au canevas temporaire
      const texteTemp = new fabric.IText(this.texteEditable.text, {
        left: 0,
        top: 0,
        fill: 'white',
      });
      tempCanvas.add(texteTemp);

      // Récupérer l'image du canevas temporaire
      const imageDataURL = tempCanvas.toDataURL();

      // Créer un lien de téléchargement pour le texte
      const a = document.createElement('a');
      a.href = imageDataURL;
      a.download = 'texte_modifie.jpg';
      a.click();
    }
  }



  sauvegarderImage() {
    if (this.canvas) {
      const imageDataURL = this.canvas.toDataURL();
      const a = document.createElement('a');
      a.href = imageDataURL;
      a.download = 'image_modifiee.jpg';
      a.click();
    }
  }

  sauvegarderImageEtTexte() {
    this.sauvegarderImage();
    this.sauvegarderTexte();
  }


  uploadImage(){
    if (this.canvas) {
      const imageDataURL = this.canvas.toDataURL();
      var userId: number = +<string>getCookie("id");
      ImageUploader.uploadBase64Image(imageDataURL,userId);
    }
  }
  uploadImageEtTexte() {
    this.uploadImage();
  }
}
class ImageUploader {
  static async uploadBase64Image(base64String: string, userId:number) {
    try {
      const imageData = {
        DataURL: base64String,
        id: userId,
      };

      const response = await fetch('http://localhost:8080/memes/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });
      console.log(JSON.stringify(imageData));
      if (response.ok) {
        const responseData = await response.json(); // Si vous attendez une réponse JSON
        console.log('Image envoyée avec succès : ', responseData);
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
