export interface Contact {
  email: string;
  phone: string;
}

export interface Doctor {
  id: string;
  name: string;
  avatar: string;
  contact: Contact;
  appointments: number;
  patients: number;
}