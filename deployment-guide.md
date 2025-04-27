
# Guide de déploiement sur 10web

## Configuration requise

Pour déployer cette application sur 10web, vous devez configurer les variables d'environnement suivantes :

### Variables d'environnement Stripe
- `VITE_STRIPE_PUBLISHABLE_KEY` : Votre clé publique Stripe
- `STRIPE_SECRET_KEY` : Votre clé secrète Stripe (à configurer dans les fonctions edge)

### Variables d'environnement Supabase
- `SUPABASE_URL` : L'URL de votre projet Supabase
- `SUPABASE_ANON_KEY` : La clé anonyme de votre projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : La clé de service de votre projet Supabase

## Instructions de déploiement

1. Dans votre tableau de bord 10web, accédez à la section "Variables d'environnement"
2. Ajoutez chaque variable d'environnement listée ci-dessus
3. Assurez-vous que tous les fichiers ont les bonnes permissions (644 pour les fichiers, 755 pour les dossiers)
4. Déployez l'application

## Vérification post-déploiement

1. Vérifiez que la page d'accueil se charge correctement
2. Testez le formulaire de demande
3. Vérifiez que les paiements Stripe fonctionnent en mode test
4. Confirmez que les emails de confirmation sont envoyés correctement

## Support

Pour toute question sur le déploiement, contactez :
- Support 10web : support@10web.io
- Notre équipe : contact@racco-service.com
