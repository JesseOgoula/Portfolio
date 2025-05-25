# Croissance Digitale Expert

Une application web moderne construite avec React, TypeScript, Vite et Tailwind CSS.

## Prérequis

- Node.js 18+ 
- npm 9+

## Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install
```

## Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

## Production

```bash
# Construire l'application
npm run build

# Prévisualiser la version de production
npm run preview
```

## Déploiement

Ce projet est configuré pour être déployé sur Vercel. Pour déployer :

1. Créez un compte sur [Vercel](https://vercel.com)
2. Installez Vercel CLI : `npm i -g vercel`
3. Connectez-vous : `vercel login`
4. Déployez : `vercel`

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Comment déployer ce projet ?

Ce projet est configuré pour être déployé sur Vercel. Voici les étapes à suivre :

### Option 1 : Déploiement automatique avec Vercel

1. Créez un compte sur [Vercel](https://vercel.com) si ce n'est pas déjà fait
2. Importez votre projet GitHub dans Vercel
3. Vercel détectera automatiquement que c'est un projet Vite et configurera le build correctement
4. Cliquez sur "Deploy"

### Option 2 : Déploiement via CLI

1. Installez Vercel CLI globalement :
```bash
npm install -g vercel
```

2. Connectez-vous à votre compte Vercel :
```bash
vercel login
```

3. Déployez le projet :
```bash
vercel
```

### Configuration du domaine personnalisé

1. Dans le dashboard Vercel, allez dans les paramètres de votre projet
2. Cliquez sur "Domains"
3. Ajoutez votre domaine et suivez les instructions pour la configuration DNS
