## Dépendences

`pnpm install`

## Génération du swagger

`pnpm generate`

## Compilation TypeScript

`pnpm build`

## Lancement dev

Permet d'être lancé sans compilation et de relancer dynamiquement l'application à chaque update
`pnpm dev`

## Architecture

- Config : Contient l'initialisation de la connexion à la base de données
- Controllers : Contient les classes contenant la gestion des routes de l'API
- DTO : Contient les interfaces de communication de l'API
- Model: Contient les entités représentant les différentes tables SQL
- Routes : Fichier généré par tsoa pour la déclaration des routes
- Services : Contient le code métier
- app.ts : Fichier principal de l'application
- library.sqlite : Fichier de base de données
- package.json : Contient les dépendances nécessaires pour l'application
- tsconfig.json : Configuration de la compilation typescript
- tsoa.json: Configuration de la génération du Swagger

## Exercice

1) Identifier et corriger l'erreur de la route POST authors
2) Renvoyer une erreur personnalisée avec un code 404 si l'auteur n'est pas trouvée lors des routes PATCH et GET/{id}
3) 
    1) Développer la route GET /books
    2) Développer la route GET /books/{id}
    3) Développer la route POST /books
    4) Développer la route PATCH /books/{id}
4) 
    1) Développer le modèle BookCollection
    2) Développer le DTO BookCollection
    3) Développer la route GET /books-collection
    4) Développer la route GET /books-collection/{id}
    5) Développer la route POST /books-collection
    6) Développer la route PATCH /books-collection/{id}
5) 
    1) Mettre à jour la route DELETE /authors/{id} afin d'empêcher la suppression si un exemplaire d'un de ses livres est présent dans la bibliothèques
    2) Développer la route DELETE /books/{id} en empêchant la suppression du livre si un exemplaire est présent dans la bibliothèque
    3) Développer la route DELETE /books-collections/{id}
6) Renvoyer la liste des livres de l'auteur sur la route GET /authors/{id}/books
7) Renvoyer la liste des exemplaires du livre sur la route GET /books/{id}/books-collections



# API de Gestion de Bibliothèque

Une API REST complète développée en TypeScript avec Express.js pour la gestion d'une bibliothèque numérique. Ce projet implémente un système complet de gestion des auteurs, livres et collections avec authentification JWT.

## Technologies Utilisées

- **Backend**: Node.js, Express.js, TypeScript
- **Base de données**: SQLite avec Sequelize ORM
- **Documentation**: Swagger/OpenAPI avec TSOA
- **Authentification**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Logging**: Morgan

## Fonctionnalités Développées

### Authentification
- Système d'authentification complet avec JWT
- Middleware de protection des routes
- Gestion des utilisateurs avec hashage des mots de passe

### Gestion des Auteurs
- **GET** `/authors` - Liste tous les auteurs
- **GET** `/authors/{id}` - Détails d'un auteur spécifique
- **POST** `/authors` - Création d'un nouvel auteur
- **PATCH** `/authors/{id}` - Modification d'un auteur
- **DELETE** `/authors/{id}` - Suppression d'un auteur (avec vérifications)
- **GET** `/authors/{id}/books` - Liste des livres d'un auteur

### Gestion des Livres
- **GET** `/books` - Liste tous les livres avec leurs auteurs
- **GET** `/books/{id}` - Détails d'un livre spécifique
- **POST** `/books` - Création d'un nouveau livre
- **PATCH** `/books/{id}` - Modification d'un livre
- **DELETE** `/books/{id}` - Suppression d'un livre (avec vérifications)
- **GET** `/books/{id}/books-collections` - Liste des exemplaires d'un livre

### Gestion des Collections (Exemplaires)
- **GET** `/books-collections` - Liste tous les exemplaires
- **GET** `/books-collections/{id}` - Détails d'un exemplaire
- **POST** `/books-collections` - Ajout d'un nouvel exemplaire
- **PATCH** `/books-collections/{id}` - Modification d'un exemplaire
- **DELETE** `/books-collections/{id}` - Suppression d'un exemplaire

### Gestion des Utilisateurs
- **GET** `/users` - Liste des utilisateurs
- **GET** `/users/{id}` - Détails d'un utilisateur
- **POST** `/users` - Création d'un utilisateur
- **PATCH** `/users/{id}` - Modification d'un utilisateur

## Architecture Développée

### Structure du Projet
```
src/
├── config/          # Configuration de la base de données
├── controllers/     # Contrôleurs REST avec décorateurs TSOA
├── dto/            # Objets de transfert de données (Input/Output)
├── error/          # Gestion personnalisée des erreurs
├── mapper/         # Mappers pour transformation des données
├── middlewares/    # Middlewares (auth, gestion d'erreurs)
├── models/         # Modèles Sequelize (Author, Book, BookCollection, User)
├── routes/         # Routes générées automatiquement par TSOA
├── services/       # Logique métier et accès aux données
└── types/          # Types TypeScript personnalisés
```

### Modèles de Données Implémentés

#### Author
- `id`, `first_name`, `last_name`
- Relations: Un auteur peut avoir plusieurs livres

#### Book
- `id`, `title`, `publish_year`, `isbn`, `author_id`
- Relations: Appartient à un auteur, peut avoir plusieurs exemplaires

#### BookCollection
- `id`, `book_id`, `available`, `state`
- États: Inutilisable, Mauvais, Passable, Bon, Très bon, Neuf
- Relations: Appartient à un livre

#### User
- `id`, `username`, `password`
- Authentification avec JWT

## Sécurité et Validation

### Fonctionnalités de Sécurité Implémentées
- **Authentification JWT** : Protection des routes sensibles
- **Validation des données** : Validation côté serveur avec Joi
- **Gestion d'erreurs personnalisées** : Codes d'erreur HTTP appropriés (404, 400, 500)
- **Vérifications d'intégrité** : 
  - Impossible de supprimer un auteur si ses livres ont des exemplaires
  - Impossible de supprimer un livre si des exemplaires existent
- **Hashage des mots de passe** : Sécurisation des données utilisateur

## Documentation API

L'API est entièrement documentée avec Swagger/OpenAPI et accessible via `/docs` quand l'application est lancée.

### Génération Automatique
- Documentation Swagger générée automatiquement via TSOA
- Types TypeScript convertis en schémas OpenAPI
- Interface interactive pour tester l'API

## Installation et Lancement

```bash
# Installation des dépendances
pnpm install

# Génération de la documentation Swagger
pnpm generate

# Compilation TypeScript
pnpm build

# Lancement en mode développement
pnpm dev

# Lancement en production
pnpm start
```

## Points Forts du Développement

1. **Architecture Clean** : Séparation claire entre contrôleurs, services et modèles
2. **Type Safety** : Utilisation complète de TypeScript avec types personnalisés
3. **Documentation Auto-générée** : Swagger/OpenAPI avec TSOA
4. **Validation Robuste** : Vérifications d'intégrité référentielle
5. **Sécurité** : Authentification JWT et gestion d'erreurs
6. **Hot Reload** : Développement facilité avec rechargement automatique
7. **Relations Complexes** : Gestion des relations entre entités avec Sequelize

## Base de Données

Base de données SQLite (`library.sqlite`) avec relations bien définies entre les entités Author, Book, BookCollection et User.
