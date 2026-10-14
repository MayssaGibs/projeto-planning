
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {

  sidebarOpen = false;

  modalSuporteAberto = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  abrirSuporte(): void {
    this.modalSuporteAberto = true;
    this.sidebarOpen = false;
  }

  fecharSuporte(): void {
    this.modalSuporteAberto = false;
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
