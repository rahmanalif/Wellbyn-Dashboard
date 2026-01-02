export interface Patient {
  id: string;
  initial: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  gender: string;
  lastVisit: string;
  status: string;
}