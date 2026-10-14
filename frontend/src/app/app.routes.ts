
import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login),
  },


  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/login/recuperar-senha/recuperar-senha')
        .then(m => m.RecuperarSenha),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home),
  },


  {
    path: 'reserva',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reserva/reserva')
        .then(m => m.Reserva),
  },

  {
    path: 'agenda',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/agenda/agenda')
        .then(m => m.Agenda),
  },


  {
    path: 'editar-perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/editar-perfil/editar-perfil')
        .then(m => m.EditarPerfil),
  },

  {
    path: 'resolucao-conflitos',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/resolucao-conflitos/resolucao-conflitos')
        .then(m => m.ResolucaoConflitos),
  },


  {
    path: 'registrar-sala',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/registrar-sala/registrar-sala')
        .then(m => m.RegistrarSala),
  },


  {
    path: 'adicionar-funcionario',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/adicionar-funcionario/adicionar-funcionario')
        .then(m => m.AdicionarFuncionario),
  },
  {
    path: 'historico',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/historico/historico')
        .then(m => m.Historico),
  },


  {
    path: 'admin-manutencao',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin-manutencao/admin-manutencao')
        .then(m => m.AdminManutencao),
  },


  
  {
    path: 'salas-manutencao',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/salas-manutencao/salas-manutencao')
        .then(m => m.SalasManutencao),
  },

  // ROTA INICIAL
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // ROTA NÃO ENCONTRADA
  {
    path: '**',
    redirectTo: 'home',
  },

];
