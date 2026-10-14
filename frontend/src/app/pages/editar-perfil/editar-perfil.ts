
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

interface DadosPerfil {
  nome: string;
  matricula: string;
  telefone: string;
  genero: string;
  designacao: string;
  setor: string;
  cargo: string;
  foto: string;
}

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    FormsModule,
    AdminSidebar,
    FuncionarioSidebar
  ],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfil implements OnInit {

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  nome = '';
  email = '';
  matricula = '';
  telefone = '';
  genero = '';
  designacao = '';
  setor = '';
  cargo = '';
  foto = '';

  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  mostrarSenhaAtual = false;
  mostrarNovaSenha = false;
  mostrarConfirmarSenha = false;

  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  private dadosOriginais: DadosPerfil | null = null;

  ngOnInit(): void {
    this.carregarPerfil();
  }

  isAdministrador(): boolean {
    return this.authService.admin();
  }

  isFuncionario(): boolean {
    return !this.isAdministrador();
  }

  get rotaInicio(): string {
    return this.isAdministrador()
      ? '/resolucao-conflitos'
      : '/home';
  }

  get tipoUsuario(): string {
    return this.isAdministrador()
      ? 'Administrador'
      : 'Funcionário';
  }

  get iniciais(): string {
    const partes = this.nome
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!partes.length) {
      return this.isAdministrador() ? 'DA' : 'FU';
    }

    return partes
      .slice(0, 2)
      .map(parte => parte.charAt(0).toUpperCase())
      .join('');
  }

  // Cada conta possui sua própria chave de armazenamento.
  private chavePerfil(): string {
    const emailLogado =
      this.authService.usuarioAtual()?.email ?? 'desconhecido';

    return `planning-perfil-${emailLogado.trim().toLowerCase()}`;
  }

  carregarPerfil(): void {
    const emailLogado =
      this.authService.usuarioAtual()?.email ?? '';

    const padrao: DadosPerfil = {
      nome: this.isAdministrador()
        ? 'DAVID ALBUQUERQUE RASKIN'
        : '',
      matricula: '',
      telefone: '',
      genero: '',
      designacao: '',
      setor: '',
      cargo: this.isAdministrador()
        ? 'Administrador'
        : '',
      foto: ''
    };

    let dados = padrao;

    if (isPlatformBrowser(this.platformId)) {
      const salvo = localStorage.getItem(this.chavePerfil());

      if (salvo) {
        try {
          dados = {
            ...padrao,
            ...JSON.parse(salvo)
          };
        } catch {
          dados = padrao;
        }
      }
    }

    this.email = emailLogado;
    this.aplicarDados(dados);
    this.dadosOriginais = { ...dados };
  }

  private aplicarDados(dados: DadosPerfil): void {
    this.nome = dados.nome;
    this.matricula = dados.matricula;
    this.telefone = dados.telefone;
    this.genero = dados.genero;
    this.designacao = dados.designacao;
    this.setor = dados.setor;
    this.cargo = dados.cargo;
    this.foto = dados.foto;
  }

  salvarPerfil(): void {
    this.mensagem = '';

    if (!this.nome.trim()) {
      this.exibirMensagem(
        'Digite seu nome completo.',
        'erro'
      );
      return;
    }

    const dados: DadosPerfil = {
      nome: this.nome.trim(),
      matricula: this.matricula.trim(),
      telefone: this.telefone.trim(),
      genero: this.genero,
      designacao: this.designacao.trim(),
      setor: this.setor.trim(),
      cargo: this.cargo.trim(),
      foto: this.foto
    };

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(
          this.chavePerfil(),
          JSON.stringify(dados)
        );
      } catch {
        this.exibirMensagem(
          'Não foi possível salvar o perfil neste navegador.',
          'erro'
        );
        return;
      }
    }

    this.aplicarDados(dados);
    this.dadosOriginais = { ...dados };

    this.exibirMensagem(
      'Perfil atualizado com sucesso!',
      'sucesso'
    );
  }

  cancelarAlteracoes(): void {
    if (this.dadosOriginais) {
      this.aplicarDados(this.dadosOriginais);
    }

    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
    this.mensagem = '';
  }

  alterarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (!arquivo) {
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      this.exibirMensagem(
        'Selecione um arquivo de imagem.',
        'erro'
      );
      input.value = '';
      return;
    }

    if (arquivo.size > 1024 * 1024) {
      this.exibirMensagem(
        'A imagem deve ter no máximo 1 MB.',
        'erro'
      );
      input.value = '';
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      this.foto = String(leitor.result ?? '');
      input.value = '';
    };

    leitor.onerror = () => {
      this.exibirMensagem(
        'Não foi possível carregar a imagem.',
        'erro'
      );
      input.value = '';
    };

    leitor.readAsDataURL(arquivo);
  }

  alterarSenha(): void {
    this.exibirMensagem(
      'A alteração de senha estará disponível após a integração com o backend.',
      'erro'
    );
  }

  private exibirMensagem(
    texto: string,
    tipo: 'sucesso' | 'erro'
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }
}
