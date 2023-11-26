# meme-generator

## Setup Backend

### I. Set up Intellij


1. Clonage du projet
Pour récupérer le repository GitLab du TP, lance git clone https://gitlab.com/llenet/java-angular.git


2. Téléchargement de Java 17
Depuis Intellij, télécharger Java 17 : 
![back-4](img-readme/back-4.png)
![back-5](img-readme/back-5.png)
![back-6](img-readme/back-6.png)


Sélectionne Git Bash
![back-6bis](img-readme/back-6bis.png)

Copie-colle le .env.sample en .env
Fait un docker-compose up

Rajoute le pluggin : https://plugins.jetbrains.com/plugin/7861-envfile
![back-1](img-readme/back-1.png)
![back-2](img-readme/back-2.png)
![back-3](img-readme/back-3.png)


### II. Set up


2. Afficher la BDD dans Intellij
Effectue les étapes suivantes :
![back-6bisbis](img-readme/back-6bisbis.png)
![back-7](img-readme/back-7.png)


Installe les drivers si besoin :
![back-8](img-readme/back-8.jpg)


Saisie les infos (1-3), puis test la connexion à la bdd (4)
![back-9](img-readme/back-9.jpg)
![back-10](img-readme/back-10.png)

 
Si c'est valide, clique sur OK (5)

3. Initialisation de la BDD
C'est cool d'avoir une BDD qui fonctionne mais c'est encore plus cool quand on peut lui insérer des données en 2 clics :
![back-11](img-readme/back-11.png)


Clic droit + run : 
![back-12](img-readme/back-12.png)
![back-13](img-readme/back-13.png)


Tadaaaam (j'avoue un peu plus que 2 clics)
![back-14](img-readme/back-14.png)



### IV. Run du projet 
Run BackSkeletonApplication


## Setup Frontend
npm install -g @angular/cli
npm install ts-evaluator
npm install @angular/router --force
ng update @angular/cli@latest @angular/core@latest
npm install bootstrap
ng serve


### Fonctionalités :
Fonctionalité 1: Système de compte avec une inscription(mot de passe et username doivent faire plus de 3 caractères) et une connexion avec un cookie (qui s'update dans la bdd connexion/déconnexion) redirigeant vers la page de connexion si non-valide, bouton de déconnexion.
Fonctionalité 2 : Importation d'une image sur le site, bouton : "choisir un fichier"
Fonctionalité 3 : Téléchargement d'une image depuis le site sur l'ordinateur, bouton : Télécharger
Fonctionalité 7 : Sauvegarder l'image dans la base de données, bouton : Sauvegarder
Fonctionalité 4 : Ajout de textes de couleurs différentes sur l'image, bouton : ajouter du texte (sélectionner la couleur avant d'apputer sur le bouton)
Fonctionalité 6 : Onglet historique de tout les memes sauvegardés sur le site (téléchargemet possible), bouton : Voir les memes de la communauté
Fonctionalité 7 : Onglet historique des memes sauvegardés par l'utilisateur actuel (téléchargement + suppression possible), bouton : Voir tous mes memes

## Data Structure

![data](img-readme/data.png)

