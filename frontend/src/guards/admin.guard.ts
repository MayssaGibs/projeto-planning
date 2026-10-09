
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Durante o SSR, o localStorage não está disponível.
  // A verificação será feita no navegador.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Verifica se o usuário está logado.
  if (!authService.usuarioLogado()) {
    return router.createUrlTree(['/login']);
  }

  // Verifica se o usuário é administrador.
  if (!authService.admin()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
