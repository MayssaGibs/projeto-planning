import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Pergunta ao AuthService se o usuário está logado
  if (authService.usuarioLogado()) {
    return true;
  }
  // Se não estiver, manda de volta para a tela de login
  return router.createUrlTree(['/login']);
};