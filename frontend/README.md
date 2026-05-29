# Abricot.co — Frontend

[English](#english) | [Français](#français)

---

# English

## About

Abricot.co is a collaborative SaaS project management application built with Next.js and React as part of the OpenClassrooms project:

**"Develop a Task Management SaaS Application"**

The application allows users to manage projects, collaborate with contributors, create and organize tasks, track project progress, and communicate through task comments.

---

## Features

### Authentication

- User registration
- User login
- Secure authentication using JWT
- Protected routes
- Profile management
- Password update

### Project Management

- Create projects
- Edit project information
- Manage contributors
- Project progress tracking

### Task Management

- Create tasks
- Edit tasks
- Delete tasks
- Assign contributors
- Update task status
- Due date management

### Collaboration

- Contributor management
- Task comments
- Role and permission system

### Dashboard

- List view
- Kanban view
- Project overview
- Task overview

### Accessibility

- Keyboard navigation support
- Accessible forms and labels
- Accessible modal dialogs
- ARIA attributes where required
- WAVE validation with no reported accessibility errors
- WCAG AA compliant practices

---

## Tech Stack

- Next.js 16
- React 19
- JavaScript (ES6+)
- Context API
- Fetch API
- Plain CSS

---

## Prerequisites

Before running the project, make sure you have:

- Node.js 20 or higher
- npm
- The backend API running locally

---

## Environment Variables

Create a `.env.local` file at the root of the frontend project:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Adjust the URL if your backend runs on a different port.

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Project Structure

```text
src/
├── app/
├── components/
├── layout/
├── api/
└── styles/
```

---

## Responsive Design

The application is fully responsive and supports:

- Mobile devices
- Tablets
- Desktop screens

---

# Français

## À propos

Abricot.co est une application SaaS collaborative de gestion de projet développée avec Next.js et React dans le cadre du projet OpenClassrooms :

**« Développez un SaaS de gestion de projet »**

L'application permet aux utilisateurs de gérer des projets, collaborer avec des contributeurs, créer et organiser des tâches, suivre l'avancement des projets et communiquer via un système de commentaires.

---

## Fonctionnalités

### Authentification

- Inscription utilisateur
- Connexion utilisateur
- Authentification sécurisée avec JWT
- Routes protégées
- Gestion du profil
- Modification du mot de passe

### Gestion des projets

- Création de projets
- Modification des informations du projet
- Gestion des contributeurs
- Suivi de l'avancement des projets

### Gestion des tâches

- Création de tâches
- Modification de tâches
- Suppression de tâches
- Attribution des contributeurs
- Gestion des statuts
- Gestion des échéances

### Collaboration

- Gestion des contributeurs
- Commentaires sur les tâches
- Système de rôles et permissions

### Dashboard

- Vue liste
- Vue Kanban
- Vue d'ensemble des projets
- Vue d'ensemble des tâches

### Accessibilité

- Navigation complète au clavier
- Formulaires accessibles avec labels
- Fenêtres modales accessibles
- Utilisation des attributs ARIA lorsque nécessaire
- Validation WAVE sans erreur signalée
- Respect des bonnes pratiques WCAG niveau AA

---

## Stack Technique

- Next.js 16
- React 19
- JavaScript (ES6+)
- Context API
- Fetch API
- CSS classique

---

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir :

- Node.js 20 ou supérieur
- npm
- L'API backend démarrée localement

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine du projet frontend :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Adaptez l'URL selon la configuration de votre backend.

---

## Installation

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

L'application sera disponible à l'adresse :

```text
http://localhost:3000
```

---

## Build de production

Créer le build de production :

```bash
npm run build
```

Lancer le serveur de production :

```bash
npm start
```

---

## Structure du projet

```text
src/
├── app/
├── components/
├── layout/
├── api/
└── styles/
```

---

## Responsive Design

L'application est entièrement responsive et s'adapte aux :

- Smartphones
- Tablettes
- Ordinateurs de bureau
