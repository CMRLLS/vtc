import { Content, Language } from './types';

// In a real deployment, these would come from process.env
export const WHATSAPP_NUMBER = "33600000000"; // Format: CountryCode + Number without +
export const CONTACT_EMAIL = "concierge@elite-mobility.vip";

export const TRANSLATIONS: Record<Language, Content> = {
  fr: {
    config: {
      whatsappNumber: "33600000000",
      contactEmail: "concierge@elite-mobility.vip"
    },
    nav: {
      services: "Services",
      process: "Expérience",
      fleet: "Flotte",
      values: "Valeurs",
      contact: "Contact",
      book: "Réserver un trajet",
    },
    hero: {
      subtitle: "L'ART DU TRANSPORT PRIVÉ",
      title: "L'Excellence en Mouvement",
      cta: "Réserver votre trajet",
      videoUrl: "" // Empty by default, user can add in admin. e.g. https://cdn.coverr.co/videos/coverr-driving-through-the-city-at-night-4566/1080p.mp4
    },
    services: {
      title: "Services Sur-Mesure",
      items: [
        {
          title: "Transferts VIP",
          desc: "Accueil personnalisé, assistance bagages et sérénité absolue.",
          iconName: 'Plane'
        },
        {
          title: "Événements & Galas",
          desc: "Arrivée remarquée pour festivals, premières et fashion weeks.",
          iconName: 'Star'
        },
        {
          title: "Coordination Sécurité",
          desc: "Collaboration fluide avec vos équipes de protection rapprochée.",
          iconName: 'ShieldCheck'
        },
        {
          title: "Mise à Disposition",
          desc: "Véhicule et chauffeur dédiés pour vos tournées et séjours.",
          iconName: 'Crown'
        }
      ]
    },
    process: {
      title: "L'Expérience",
      subtitle: "Un parcours fluide, de la demande à l'arrivée.",
      steps: [
        { title: "Demande", desc: "Envoyez vos détails via notre formulaire sécurisé." },
        { title: "Conciergerie", desc: "Confirmation immédiate et attribution du chauffeur." },
        { title: "Voyage", desc: "Prise en charge ponctuelle et transport luxueux." },
        { title: "Facturation", desc: "Paiement transparent et facturation mensuelle sur demande." }
      ]
    },
    values: {
      title: "Notre Engagement",
      subtitle: "NDA • Security • Excellence",
      privacy: { title: "Confidentialité Absolue", desc: "Accords de confidentialité (NDA) systématiques. Ce qui se passe à bord reste à bord." },
      security: { title: "Sécurité Renforcée", desc: "Chauffeurs formés à la conduite défensive et gestion des itinéraires sensibles." },
      excellence: { title: "Service Palace", desc: "Une attention au détail digne des plus grands établissements." },
    },
    fleet: {
      title: "La Flotte",
      desc: "Mercedes-Benz Classe V - Extra Long. Le summum du confort mobile.",
      features: ["Sièges cuir exécutifs", "Vitres teintées intégrales", "WiFi Haut Débit", "Presse Internationale", "Rafraîchissements Premium"],
    },
    booking: {
      title: "Demande de Réservation",
      subtitle: "Service uniquement sur réservation. Confirmation rapide.",
      disclaimer: "Votre demande sera traitée par notre conciergerie dans l'heure.",
      form: {
        firstname: "Prénom",
        lastname: "Nom",
        phone: "Téléphone",
        email: "Email Professionnel",
        date: "Date de prise en charge",
        time: "Heure",
        pickup: "Lieu de départ",
        destination: "Destination",
        type: "Type de mission",
        typeOptions: ["Trajets personnalisés", "Transfert Aéroport/Gare", "Mise à disposition (4h+)", "Événement / Gala", "Tournée / Roadshow", "Autre"],
        special: "Demandes particulières (Sécurité, Presse, Boissons...)",
        nda: "Je requiers la signature d'un NDA avant le début de la mission",
        submit: "Envoyer la demande via WhatsApp",
      },
    },
    footer: {
      rights: "Tous droits réservés. L'Élite Mobility.",
    },
  },
  en: {
    config: {
      whatsappNumber: "33600000000",
      contactEmail: "concierge@elite-mobility.vip"
    },
    nav: {
      services: "Services",
      process: "Experience",
      fleet: "Fleet",
      values: "Values",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      subtitle: "THE ART OF PRIVATE TRANSPORT",
      title: "Excellence in Motion",
      cta: "Request a Booking",
      videoUrl: ""
    },
    services: {
      title: "Bespoke Services",
      items: [
        {
          title: "VIP Transfers",
          desc: "Personalized meet & greet, luggage assistance, and absolute serenity.",
          iconName: 'Plane'
        },
        {
          title: "Events & Galas",
          desc: "Make an entrance at festivals, premieres, and fashion weeks.",
          iconName: 'Star'
        },
        {
          title: "Security Coordination",
          desc: "Seamless collaboration with your personal protection teams.",
          iconName: 'ShieldCheck'
        },
        {
          title: "Chauffeur on Disposal",
          desc: "Dedicated vehicle and driver for your tours and extended stays.",
          iconName: 'Crown'
        }
      ]
    },
    process: {
      title: "The Experience",
      subtitle: "A seamless journey, from request to arrival.",
      steps: [
        { title: "Request", desc: "Send your details via our secure form." },
        { title: "Concierge", desc: "Immediate confirmation and chauffeur assignment." },
        { title: "Journey", desc: "Punctual pickup and luxurious transport." },
        { title: "Billing", desc: "Transparent payment and monthly invoicing on request." }
      ]
    },
    values: {
      title: "Our Commitment",
      subtitle: "NDA • Security • Excellence",
      privacy: { title: "Absolute Privacy", desc: "Systematic NDAs. What happens on board, stays on board." },
      security: { title: "Enhanced Security", desc: "Drivers trained in defensive driving and sensitive route management." },
      excellence: { title: "Palace Service", desc: "Attention to detail worthy of the finest establishments." },
    },
    fleet: {
      title: "The Fleet",
      desc: "Mercedes-Benz V-Class - Extra Long. The pinnacle of mobile comfort.",
      features: ["Executive Leather Seats", "Privacy Glass", "High-Speed WiFi", "International Press", "Premium Refreshments"],
    },
    booking: {
      title: "Booking Request",
      subtitle: "Service by reservation only. Rapid confirmation.",
      disclaimer: "Your request will be processed by our concierge within the hour.",
      form: {
        firstname: "First Name",
        lastname: "Last Name",
        phone: "Phone Number",
        email: "Business Email",
        date: "Pickup Date",
        time: "Time",
        pickup: "Pickup Location",
        destination: "Destination",
        type: "Mission Type",
        typeOptions: ["Airport/Station Transfer", "Disposal (4h+)", "Event / Gala", "Tour / Roadshow", "Other"],
        special: "Special Requests (Security, Press, Drinks...)",
        nda: "I require an NDA signature before the mission starts",
        submit: "Send Request via WhatsApp",
      },
    },
    footer: {
      rights: "All rights reserved. L'Élite Mobility.",
    },
  },
};