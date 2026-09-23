import { Injectable, signal } from '@angular/core';

export type UserRole = 'investor' | 'owner';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verifiedInvestor: boolean;
  portfolioValue: number;
  activeFlips: number;
  availableCapital: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly currentUser = signal<UserProfile | null>({
    id: 'usr-1',
    name: 'Carlos Mendoza, CFA',
    email: 'carlos.mendoza@inversiones.com',
    role: 'investor',
    verifiedInvestor: true,
    portfolioValue: 340000,
    activeFlips: 3,
    availableCapital: 185000
  });

  readonly isAuthModalOpen = signal<boolean>(false);
  readonly selectedRole = signal<UserRole>('investor');

  openAuthModal(role: UserRole = 'investor'): void {
    this.selectedRole.set(role);
    this.isAuthModalOpen.set(true);
  }

  closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  }

  switchRole(role: UserRole): void {
    this.selectedRole.set(role);
    const user = this.currentUser();
    if (user) {
      this.currentUser.set({
        ...user,
        role
      });
    }
  }

  loginAsDemo(role: UserRole): void {
    this.currentUser.set({
      id: role === 'investor' ? 'usr-inv' : 'usr-own',
      name: role === 'investor' ? 'Carlos Mendoza, CFA' : 'Elena Rostova, Arquitecta',
      email: role === 'investor' ? 'carlos.mendoza@inversiones.com' : 'elena.rostova@desarrollos.com',
      role,
      verifiedInvestor: true,
      portfolioValue: role === 'investor' ? 340000 : 1250000,
      activeFlips: role === 'investor' ? 3 : 5,
      availableCapital: role === 'investor' ? 185000 : 420000
    });
    this.closeAuthModal();
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
