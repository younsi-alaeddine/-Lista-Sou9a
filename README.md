# Lista Sou9a

Lista Sou9a est une application web trilingue (derja, français, anglais) pensée pour préparer et partager une liste de courses tunisienne complète. Elle centralise produits, astuces budget, informations sur les souks de Djerba et outils d’export (CSV/PDF/partage). L’expérience est pensée mobile-first, avec mode sombre et interface RTL automatique.

## Fonctionnalités clés

- **Catalogue trié par catégorie** : plus de 250 produits avec libellés multilingues, recherche, notes et quantités personnalisées.
- **Suivi du panier** : récapitulatif par catégorie, suivi du budget et historique des totaux pour visualiser l’évolution.
- **Exports & partage** :
  - CSV UTF-8 multilingue.
  - PDF avec rendu arabe fidèle (police Amiri embarquée, texte façonné RTL).
  - Partage WhatsApp, e-mail ou via l’API Web Share.
- **Popups informatifs** : tutoriel express, marchés hebdomadaires de Djerba, astuces budget, section À propos, contact mail/téléphone.
- **Thème & préférences** : mode sombre automatique, persistance des choix utilisateur (langue, budget cible, éléments cochés).
- **Footer communautaire** : message personnalisé, lien Instagram `@younsialaeddine`, copyright dynamique.
- **PWA ready** : manifest configuré, service worker généré via `vite-plugin-pwa`, favicon personnalisé (`sou9a-logo.svg`).

## Stack technique

- **React 19 + Vite 7**
- **TypeScript** pour la sûreté des types.
- **Tailwind CSS** pour le design système.
- **vite-plugin-pwa** pour l’installation hors ligne.
- **jsPDF** avec intégration manuelle de la police Amiri et façonnage RTL pour les PDF en derja.

## Scripts principaux

```bash
npm install    # installe les dépendances
npm run dev    # sert l'application en mode développement
npm run build  # génère la version production (dossier dist/)
npm run preview # sert la version buildée pour vérification
```

## Déploiement sur Vercel

1. Pousser le dépôt vers GitHub.
2. Créer un nouveau projet Vercel, importer `younsi-alaeddine/-Lista-Sou9a`.
3. Laisser les valeurs détectées : build `npm run build`, dossier de sortie `dist/`.
4. Activer l’option “Serveur statique” par défaut : Vercel servira le SPA correctement.

## SEO & partages

Le fichier `index.html` inclut les balises meta classiques (`description`, `og:title`, `og:description`, `og:image`, `og:locale`, `twitter:card`) pour un aperçu optimisé lors du partage sur les réseaux sociaux ou messageries.

---

**Contact** : `younsialaeddine@gamil.com` – Instagram [`@younsialaeddine`](https://www.instagram.com/younsialaeddine)  
*“On ne demande rien d’autre que vos prières.”*


