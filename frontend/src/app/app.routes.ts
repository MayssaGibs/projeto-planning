import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'reserva',
    loadComponent: () =>
      import('./pages/reserva/reserva').then((m) => m.Reserva),
  },
];