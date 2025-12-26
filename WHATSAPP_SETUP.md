# Guide d'Intégration WhatsApp Business

Ce site utilise une méthode simple et robuste pour l'intégration WhatsApp : le protocole **Click-to-Chat** (API URL). Cela évite d'avoir besoin d'un serveur backend complexe pour gérer les messages, car le client envoie le message depuis son propre téléphone/ordinateur.

## 1. Pré-requis

1.  Avoir un compte **WhatsApp Business** installé sur votre téléphone professionnel.
2.  Avoir le numéro de téléphone au format international.

## 2. Configuration du Numéro

Dans votre **Panel Admin** (accessible via `/admin` ou le lien en bas de page) :
1.  Allez dans l'onglet **Configuration**.
2.  Entrez votre numéro dans le champ **WhatsApp Number**.
3.  **Format IMPORTANT** :
    *   Pas de `+`
    *   Pas de `00`
    *   Code pays inclus
    *   *Exemple pour la France (06 12 34 56 78)* : `33612345678`

## 3. Fonctionnement Technique

Le formulaire de réservation (`BookingForm.tsx`) ne stocke pas de données dans une base de données. Il construit une URL dynamique :

```javascript
https://wa.me/[VOTRE_NUMERO]?text=[MESSAGE_ENCODÉ]
```

### Le Message
Le message est formaté automatiquement avec :
*   Les infos du client (Nom, Email...)
*   Les détails du trajet
*   Les mentions NDA/Sécurité

Lorsque le client clique sur "Envoyer la demande", cela ouvre son application WhatsApp avec le résumé de la commande pré-rempli. Il n'a plus qu'à appuyer sur la flèche "Envoyer".

## 4. Automatisation (Optionnel - Niveau Avancé)

Si vous souhaitez aller plus loin à l'avenir :

1.  Utilisez l'application **WhatsApp Business**.
2.  Configurez un "Message d'accueil" automatique disant : *"Merci pour votre demande de réservation. Nos équipes de conciergerie vérifient la disponibilité et reviennent vers vous sous 15 minutes."*
3.  Utilisez les "Réponses rapides" de WhatsApp Business pour confirmer les devis rapidement (`/confirmer`, `/devis`, etc.).

## 5. Note sur la Confidentialité

C'est la méthode la plus sécurisée pour démarrer car aucune donnée sensible (trajets VIP) n'est stockée sur un serveur web intermédiaire. Tout transite de manière chiffrée (E2E) via WhatsApp directement entre le client et vous.
