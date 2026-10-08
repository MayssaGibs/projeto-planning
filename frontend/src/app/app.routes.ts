import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then((m) => m.Login),
  },

  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/login/recuperar-senha/recuperar-senha')
        .then((m) => m.RecuperarSenha),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home')
        .then((m) => m.Home),
  },

  {
    path: 'reserva',
    loadComponent: () =>
      import('./pages/reserva/reserva')
        .then((m) => m.Reserva),
  },

  {
    path: 'agenda',
    loadComponent: () =>
      import('./pages/agenda/agenda')
        .then((m) => m.Agenda),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];