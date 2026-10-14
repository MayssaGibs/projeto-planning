import { isPlatformBrowser } from '@angular/common';
import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';

export type PerfilUsuario = 'usuario' | 'admin';

export type Usuario = {
  email: string;
  perfil: PerfilUsuario;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private readonly chaveUsuario = 'planning-usuario';
  private readonly chaveToken = 'planning-token';

  // Único e-mail de administrador
  private readonly emailAdmin = 'admin@email.com';

  private usuario = signal<Usuario | null>(this.carregarUsuarioSalvo());
  private tokenJwt = signal<string | null>(this.carregarTokenSalvo());

  usuarioAtual = computed(() => this.usuario());
  usuarioLogado = computed(
    () => this.usuario() !== null && this.tokenJwt() !== null
  );
  admin = computed(() => this.usuario()?.perfil === 'admin');
  token = computed(() => this.tokenJwt());

  login(email: string, senha: string): boolean {
    if (!email?.trim() || !senha?.trim()) {
      return false;
    }

    const emailNormalizado = email.trim().toLowerCase();

    // Somente o e-mail do David recebe o perfil admin
    const perfil: PerfilUsuario =
      emailNormalizado === this.emailAdmin ? 'admin' : 'usuario';

    const usuarioLogado: Usuario = {
      email: emailNormalizado,
      perfil
    };

    const tokenSimulado =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJwZXJmaWwiOiJ1c3VhcmlvIn0.' +
      'assinatura-simulada';

    this.usuario.set(usuarioLogado);
    this.tokenJwt.set(tokenSimulado);
    this.salvarAutenticacao(usuarioLogado, tokenSimulado);

    return true;
  }

  logout(): void {
    this.usuario.set(null);
    this.tokenJwt.set(null);
    this.limparAutenticacaoSalva();
  }

  obterToken(): string | null {
    return this.tokenJwt();
  }

  obterPerfil(): PerfilUsuario | null {
    return this.usuario()?.perfil ?? null;
  }

  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private carregarUsuarioSalvo(): Usuario | null {
    if (!this.estaNoNavegador()) {
      return null;
    }

    const dadosSalvos = localStorage.getItem(this.chaveUsuario);

    if (!dadosSalvos) {
      return null;
    }

    try {
      const usuarioSalvo = JSON.parse(dadosSalvos) as Usuario;

      // Recalcula o perfil para não manter permissões antigas
      const email = usuarioSalvo.email?.trim().toLowerCase();

      if (!email) {
        return null;
      }

      return {
        email,
        perfil: email === this.emailAdmin ? 'admin' : 'usuario'
      };
    } catch {
      return null;
    }
  }

  private carregarTokenSalvo(): string | null {
    if (!this.estaNoNavegador()) {
      return null;
    }

    return localStorage.getItem(this.chaveToken);
  }

  private salvarAutenticacao(usuario: Usuario, token: string): void {
    if (!this.estaNoNavegador()) {
      return;
    }

    localStorage.setItem(this.chaveUsuario, JSON.stringify(usuario));
    localStorage.setItem(this.chaveToken, token);
  }

  private limparAutenticacaoSalva(): void {
    if (!this.estaNoNavegador()) {
      return;
    }

    localStorage.removeItem(this.chaveUsuario);
    localStorage.removeItem(this.chaveToken);
  }
}