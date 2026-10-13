import { Routes } from '@angular/router';
import { RegistrarSalaComponent } from './components/registrar-sala/registrar-sala.component';
import { AdicionarFuncionarioComponent } from './components/adicionar-funcionario/adicionar-funcionario.component';

export const routes: Routes = [
  { path: 'admin/registrar-sala', component: RegistrarSalaComponent },
  { path: 'admin/adicionar-funcionario', component: AdicionarFuncionarioComponent },
];