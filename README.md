
# Connect Enedis - Application de Raccordement

Cette application permet aux utilisateurs de demander un raccordement électrique Enedis de manière simple et rapide.

## Configuration de l'environnement

Pour que l'application fonctionne correctement, vous devez configurer un fichier `.env` avec les variables d'environnement suivantes :

```
VITE_ZAPIER_CRM_WEBHOOK=https://hooks.zapier.com/hooks/catch/...  # Webhook Zapier pour le CRM
VITE_ZAPIER_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/... # Webhook Zapier pour les emails
VITE_ZAPIER_SHEETS_WEBHOOK=https://hooks.zapier.com/hooks/catch/... # Webhook Zapier pour Google Sheets
VITE_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXX # ID Google Tag Manager
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # Clé publique Stripe
```

## Démarrage rapide

1. Clonez le dépôt
2. Installez les dépendances avec `npm install`
3. Créez un fichier `.env` avec les variables d'environnement nécessaires
4. Lancez l'application en mode développement avec `npm run dev`

## Fonctionnalités

- Formulaire de demande de raccordement en plusieurs étapes
- Intégration CRM via Zapier
- Paiement sécurisé avec Stripe
- Interface administration pour la gestion des demandes

## Structure du projet

- `/src/components` - Composants React réutilisables
- `/src/pages` - Pages principales de l'application
- `/src/hooks` - Hooks React personnalisés
- `/src/services` - Services pour les API et autres fonctionnalités
- `/src/lib` - Utilitaires et configurations
