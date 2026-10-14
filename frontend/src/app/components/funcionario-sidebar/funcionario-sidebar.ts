
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../services/auth';
import { BarraPesquisa } from '../barra-pesquisa/barra-pesquisa';

@Component({
  selector: 'app-funcionario-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,BarraPesquisa],
  templateUrl: './funcionario-sidebar.html',
  styleUrl: './funcionario-sidebar.css'
})
export class FuncionarioSidebar {

  sidebarOpen = false;
  modalSuporteAberto = false;
  notificacoesAbertas = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  abrirSuporte(): void {
    this.modalSuporteAberto = true;
  }

  fecharSuporte(): void {
    this.modalSuporteAberto = false;
  }

  mostrarNotificacoes(): void {
    this.notificacoesAbertas = true;
  }

  fecharNotificacoes(): void {
    this.notificacoesAbertas = false;
  }

  sair(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
