import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then((m) => m.Login),
  },

<<<<<<< HEAD
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
      import('./pages/home/home')
        .then((m) => m.Home),
  },

=======
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
  {
    path: 'reserva',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reserva/reserva')
        .then((m) => m.Reserva),
  },

<<<<<<< HEAD
=======
  {
    path: 'reservas-de-sala',
    loadComponent: () =>
      import('./pages/reservas-de-sala/reservas-de-sala').then(
        (m) => m.ReservasDeSala
      ),
  },

>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
  {
    path: 'agenda',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/agenda/agenda')
        .then((m) => m.Agenda),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'historico',
    loadComponent: () =>
      import('./pages/historico/historico').then(
        (m) => m.Historico
      ),
  },

  {
    path: 'editar-perfil',
    loadComponent: () =>
      import('./pages/editar-perfil/editar-perfil').then(
        (m) => m.EditarPerfil
      ),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];