
import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { RegistrarSalaComponent } from './components/registrar-sala/registrar-sala.component';
import { AdicionarFuncionarioComponent } from './components/adicionar-funcionario/adicionar-funcionario.component';

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
path: 'admin/registrar-sala',
  canActivate: [],
  loadComponent: () =>
    import('./components/registrar-sala/registrar-sala.component')
      .then((m) => m.RegistrarSalaComponent),
  },
  {

  path: 'admin/adicionarFuncionarioComponent',
  canActivate: [],
  loadComponent: () =>
    import('./components/adicionar-funcionario/adicionar-funcionario.component')
      .then((m) => m. AdicionarFuncionarioComponent),
  },
    {

  path: 'admin-manutencao',
  canActivate: [],
  loadComponent: () =>
    import('./pages/admin-manutencao/admin-manutencao')
      .then((m) => m. AdminManutencao),
  },

  {
    path: '**',
    redirectTo: 'home',
  }, 
   

   
];