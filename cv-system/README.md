# CV System — Jesse Ogoula

Système de génération et de maintenance automatique du CV au format **1 page A4 strict (210mm x 297mm)**, calqué sur le design exécutif de référence bicolore (modèle David Morel / AttractiveCV), avec support **Français** et **Anglais**, export simultané en **HTML autonome** (photo base64 intégrée) et **PDF vectoriel haute définition**.

---

## 📁 Architecture du Dossier `cv-system/`

```
cv-system/
├── cv_data.json         # Données structurées en Français
├── cv_data_en.json      # Données structurées en Anglais
├── render_cv.py         # Moteur de rendu HTML + compilation PDF A4 (Chromium headless)
├── utils.py             # Utilitaires (encodage base64, icônes SVG, moteur PDF)
├── update_cv.py         # Outil de mise à jour rapide en ligne de commande
├── build.bat            # Script batch Windows 1-clic pour tout régénérer (FR + EN)
├── README.md            # Ce guide
└── assets/
    └── mee.png          # Photo professionnelle du candidat (fond détouré/studio)
```

---

## 🚀 Utilisation Rapide

### 1. Régénération complète en 1 clic
Double-cliquez sur `build.bat` ou lancez dans le terminal :

```bash
python render_cv.py --all
```

Cette commande compile simultanément :
- `public/Cv/CV_Jesse_Ogoula.html` & `public/Cv/CV_Jesse_Ogoula.pdf` (Français)
- `public/Cv/CV_Jesse_Ogoula_EN.html` & `public/Cv/CV_Jesse_Ogoula_EN.pdf` (Anglais)
- Met également à jour `public/Cv/CVjesse - French.pdf` et `public/Cv/CVjesse - English.pdf`

---

### 2. Mises à jour rapides en ligne de commande

```bash
# Modifier le titre professionnel
python update_cv.py --titre "Chief AI Officer | Lead Transformation Digitale"

# Modifier la disponibilité
python update_cv.py --dispo "Disponible immédiatement pour missions de conseil et CDI"

# Ajouter une réalisation chiffrée à une expérience
python update_cv.py --add-bullet "Iboga Lab" "Déploiement d'un agent IA d'analyse financière réduisant les délais de 80%."

# Mettre à jour l'email ou le téléphone
python update_cv.py --email "contact@ogoulajesse.pro" --tel "+241 066 19 57 86"

# Régénérer les PDF sans modifier les données
python update_cv.py --build
```

---

### 3. Mettre à jour le CV d'une simple phrase (avec l'IA)

Il vous suffit de formuler votre demande en langage naturel dans Antigravity :

> *"Ajoute la certification 'Claude 3.7 & DeepSeek R1 Masterclass' obtenue en 2026 et régénère le CV"*
>
> *"Passe le score de satisfaction chez Ogooué Labs à 95% dans les versions FR et EN"*
>
> *"Ajoute un nouveau client B2B dans l'expérience Iboga Lab et recompile les PDF"*
>
> *"Change mon titre pour afficher 'VP of AI & Digital Operations'"*

L'assistant mettra à jour automatiquement `cv_data.json` (et `cv_data_en.json`), puis exécutera la compilation.

---

## 📄 Fichiers Générés (Prêts pour Candidature & Portfolio)

| Document | Emplacement | Caractéristiques |
| :--- | :--- | :--- |
| **CV Français (HTML)** | `public/Cv/CV_Jesse_Ogoula.html` | 100% autonome, photo embarquée en base64, liens web cliquables |
| **CV Français (PDF)** | `public/Cv/CV_Jesse_Ogoula.pdf` | A4 strict (1 page), vectoriel, prêt pour impression ou ATS |
| **CV Anglais (HTML)** | `public/Cv/CV_Jesse_Ogoula_EN.html` | Version anglaise intégrale |
| **CV Anglais (PDF)** | `public/Cv/CV_Jesse_Ogoula_EN.pdf` | A4 strict (1 page), vectoriel |
