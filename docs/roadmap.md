# 📌 Roadmap d’idées pour *Lista Sou9a*

Ce document recense un maximum d’axes d’évolution possibles pour transformer l’application en solution d’achat tunisienne intelligente. Classement par thématiques pour garder une vision claire.

---

## 🎯 Expérience Utilisateur
- **Mode hors-ligne avancé** : cache complet des données, synchronisation différée.
- **Gestes mobiles** : glisser pour cocher/supprimer, vibration haptique.
- **Multi-profils** : gérer plusieurs listes (famille, maison de vacances, événements).
- **Historique de listes** : duplicata rapide des courses passées.
- **Listes intelligentes** : suggestions automatiques selon habitudes ou saison.
- **Vision calendrier** : planifier des listes par semaine/mois.

## 💸 Budget & Optimisation Prix
- **Suivi des prix** par produit (min/max, moyennes hebdo).
- **Alertes promotions** via scraping (Carrefour Tunisie, Monoprix, MG, Géant) ou API partenaires.
- **Comparateur multi-enseignes** : panier le moins cher selon souk ou grande surface.
- **Gestion du budget** : plafond à ne pas dépasser, distribution par catégorie.
- **Coupons & fidélité** : intégration des cartes (Carrefour, Aziza, etc.).

## 🤝 Collaboration & Partage
- **Listes partagées temps réel** (WebRTC, Supabase, Firebase).
- **Rôles** : membres peuvent proposer / propriétaires valident.
- **Chat / commentaires** dans une liste pour coordonner.
- **Assignation** : attribuer un produit à un membre.
- **Notifications push** (PWA) quand un produit est acheté/commenté.

## 🗣️ Input Intelligent
- **Commande vocale** (derja + fr) avec Speech-to-Text.
- **Scan de tickets de caisse** pour importer prix & déduire stock.
- **Lecteur code-barres** (WebRTC + ZXing) pour ajouter produit ou vérifier prix.
- **Reconnaissance de photos** : prendre étalage et détecter les articles.

## 🍽️ Cuisine & Nutrition
- **Module recettes tunisiennes** relié aux produits sélectionnés.
- **Planificateur de repas / Batch cooking**.
- **Calcul nutritionnel** (calories, macros, allergies).
- **Filtrer par régimes** (végétarien, sans gluten, halal, diabétiques).
- **Gestion de stock domestique** (garde-manger + dates de péremption).

## 📍 Géolocalisation & Logistique
- **Cartographie des souks & grandes surfaces** (OpenStreetMap).
- **Itinéraires optimisés** pour minimiser déplacements.
- **Livraison collaborative** : membres se partagent l’achat par zones.
- **Mode “Tour du souk”** : ordre de visite selon disponibilité.
- **Prévision foule / météo** pour choisir le bon moment d’aller au marché.

## 📊 Analytics & Insights
- **Dashboard dépenses** par période, catégorie, membre.
- **Badge gamification** : “Chef du marché”, “Pro de la promo”.
- **Prévisions** : IA anticipant les achats manquants.
- **Rapports PDF automatiques** (budget mensuel, tendances).

## 🛍️ Intégrations Marchands
- **Catalogue live Carrefour Tunisie** (scraping + API si disponible) pour prix & stocks.
- **Commande en ligne** (si API partenaires) ou paniers préparés.
- **Codes promo & cashback** via affiliés locaux.
- **Marketplace producteurs locaux** : réserver panier paysan.

## 🔒 Sécurité & Confiance
- **Authentification** (email, OAuth, OTP SMS).
- **Chiffrement local** des données sensibles.
- **Mode invité / mode famille** avec protection PIN.
- **Sauvegarde cloud** chiffrée (Supabase, Planetscale).

## ⚙️ Tech & DevOps
- **Mode desktop (Electron) & mobile natif (React Native)**.
- **Serveur GraphQL** pour centraliser produits/prix.
- **Microservices** pour scraping, notifications, analytics.
- **CI/CD** avec tests automatiques, Lighthouse PWA.
- **Multilingue complet** : ar, fr, en, it.

## 🧠 IA & Personnalisation
- **Assistant conversationnel** (“Chafeya”) pour planifier la liste.
- **Résumés automatiques** des changements entre deux listes.
- **Détection anomalies** : produit acheté rarement, prix suspect.
- **Recommandations promotionnelles** selon budget & préférences.
- **Synthèse vocale** pour lecture de la liste en mode voiture.

---

### 📅 Priorisation proposée
1. **Court terme** : budget par catégorie, suggestions saisonnières, export multi-formats.
2. **Moyen terme** : multi-profils, listes partagées temps réel, scraping prix Carrefour [[Carrefour Tunisie](https://www.carrefour.tn/)].
3. **Long terme** : assistant vocal IA, intégration livraison, data analytics avancé.

> Cette roadmap restera vivante : ajoute de nouvelles pistes au fur et à mesure des tests terrain et retours utilisateurs.

