
import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
  },

  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/login/recuperar-senha/recuperar-senha')
        .then((m) => m.RecuperarSenha),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },

  {
    path: 'reserva',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reserva/reserva').then((m) => m.Reserva),
  },

  {
    path: 'agenda',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/agenda/agenda').then((m) => m.Agenda),
  },

  {
    path: 'historico',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/historico/historico').then((m) => m.Historico),
  },

  {
    path: 'editar-perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/editar-perfil/editar-perfil')
        .then((m) => m.EditarPerfil),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
  path: 'historico',
  canActivate: [adminGuard],
  loadComponent: () =>
    import('./pages/historico/historico')
      .then((m) => m.Historico),
},

  {
    path: '**',
    redirectTo: 'home',
  },
];
