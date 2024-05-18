export type TSFixMe = any;
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  subscription: string;
  subscriptionEnd: Date;
  provider: string;
  emailVerify: boolean;
  roleId: string;
  walletId: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  wallet: string;
  achievements: any[];
  answers: any[];
  discussions: any[];
  enrollments: any[];
  flashcards: any[];
  notes: any[];
  notifications: any[];
  reports: any[];
  isDeleted: boolean;
}
