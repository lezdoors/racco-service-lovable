
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

## Checklist de compatibilité

Avant le déploiement final, assurez-vous de tester l'application sur:
- Navigateurs mobiles (iOS Safari, Chrome Android)
- Tablettes (iPad, Android)
- Ordinateurs de bureau (différentes tailles d'écran)
- Navigateurs différents (Chrome, Firefox, Safari, Edge)

## Export et mise en production

1. Exécutez `npm run build` pour générer une version optimisée
2. Vérifiez que tous les assets sont correctement référencés
3. Testez la version de production localement avec `npm run preview`
4. Déployez sur votre hébergeur (10web, Vercel, Netlify, etc.)
5. Configurez votre DNS pour pointer vers l'hébergement
6. Configurez HTTPS pour la sécurité

## Support

Pour toute question sur le déploiement, contactez :
- Support 10web : support@10web.io
- Notre équipe : contact@racco-service.com

