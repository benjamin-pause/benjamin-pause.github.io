# 🎓 Mon Portfolio – BTS SIO SISR

## 📁 Structure des fichiers

```
portfolio/
├── index.html          ← Page principale (tout est ici)
├── css/
│   └── style.css       ← Tous les styles
├── js/
│   └── main.js         ← Animations et interactivité
├── assets/
│   ├── img/            ← Mets tes images ici
│   └── cv.pdf          ← Ton CV à télécharger
└── README.md           ← Ce fichier
```

## 🚀 Utilisation en local

Ouvre simplement `index.html` dans ton navigateur.
> Si les fonts Google ne chargent pas hors-ligne, ce n'est pas grave pour le dev local.

## ✏️ Personnaliser le portfolio

### 1. Ton nom
Dans `index.html`, remplace **"Ton Prénom"** par ton vrai prénom (3 occurrences).

### 2. Ta photo
Remplace le bloc `.photo-placeholder` par :
```html
<img src="assets/img/photo.jpg" alt="Ma photo" class="about-img" />
```
Et ajoute dans le CSS :
```css
.about-img { width: 100%; border-radius: 12px; object-fit: cover; }
```

### 3. Ajouter un projet
Copie-colle ce bloc dans la section `#projets` :
```html
<article class="project-card">
  <div class="project-tag">Réseau</div>
  <h3>Nom du projet</h3>
  <p>Description courte du projet.</p>
  <div class="project-stack">
    <span>Technologie 1</span><span>Technologie 2</span>
  </div>
  <a href="lien-ou-#" class="project-link">Voir le détail →</a>
</article>
```

### 4. Ton CV
Place ton CV en PDF dans `assets/cv.pdf`.

### 5. Tes liens de contact
Modifie les liens `mailto:`, LinkedIn et GitHub dans la section `#contact`.

---

## 🌍 Mise en ligne (gratuit)

### Option 1 – GitHub Pages (recommandé)
1. Crée un compte sur [github.com](https://github.com)
2. Crée un dépôt nommé `ton-prenom.github.io`
3. Upload tous les fichiers
4. Active GitHub Pages dans les Settings du dépôt
5. Ton site est en ligne sur `https://ton-prenom.github.io`

### Option 2 – Netlify (drag & drop)
1. Va sur [netlify.com](https://netlify.com)
2. Glisse-dépose le dossier `portfolio/`
3. C'est en ligne en 30 secondes !

### Option 3 – Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Connecte ton GitHub et importe le repo
3. Déploiement automatique à chaque push

---

## 📬 Formulaire de contact en ligne

Utilise **Formspree** (gratuit) :
1. Crée un compte sur [formspree.io](https://formspree.io)
2. Crée un formulaire et copie ton endpoint
3. Dans `index.html`, ajoute `action="https://formspree.io/f/TON_ID"` au `<form>`
4. Retire la ligne `e.preventDefault()` dans `main.js`

---

## 🎨 Changer les couleurs

Dans `css/style.css`, modifie les variables CSS au début :
```css
:root {
  --accent:  #2563EB;  /* Bleu principal → change ici */
  --accent2: #10B981;  /* Vert secondaire */
  /* ... */
}
```
