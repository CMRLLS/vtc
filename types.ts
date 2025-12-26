export type Language = 'fr' | 'en';

export type IconName = 'Plane' | 'Star' | 'ShieldCheck' | 'MapPin' | 'Clock' | 'Briefcase' | 'Car' | 'Gem' | 'Wine' | 'Crown';

export interface BookingData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  type: string;
  specialRequests: string;
  nda: boolean;
}

export interface ServiceItem {
  title: string;
  desc: string;
  iconName: IconName;
}

export interface Content {
  config: {
    whatsappNumber: string;
    contactEmail: string;
  };
  nav: {
    services: string;
    process: string; // New
    fleet: string;
    values: string;
    contact: string;
    book: string;
  };
  hero: {
    subtitle: string;
    title: string;
    cta: string;
    videoUrl?: string;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  process: { // New Section
    title: string;
    subtitle: string;
    steps: { title: string; desc: string; }[];
  };
  values: {
    title: string;
    subtitle: string;
    privacy: { title: string; desc: string; };
    security: { title: string; desc: string; };
    excellence: { title: string; desc: string; };
  };
  fleet: {
    title: string;
    desc: string;
    features: string[];
  };
  booking: {
    title: string;
    subtitle: string;
    disclaimer: string;
    form: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
      date: string;
      time: string;
      pickup: string;
      destination: string;
      type: string;
      typeOptions: string[];
      special: string;
      nda: string;
      submit: string;
    };
  };
  footer: {
    rights: string;
  };
}