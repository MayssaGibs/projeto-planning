
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

type StatusSolicitacao = 'Pendente' | 'Aprovada' | 'Rejeitada';
type StatusConflito = 'Pendente' | 'Resolvido';

interface Solicitacao {
  id: number;
  responsavel: string;
  turma: string;
  prioridade: 'Alta' | 'Baixa';
  status: StatusSolicitacao;
}

interface Conflito {
  id: number;
  sala: string;
  data: string;
  horario: string;
  status: StatusConflito;
  solicitacaoA: Solicitacao;
  solicitacaoB: Solicitacao;
}

interface SalaManutencao {
  nome: string;
  motivo: string;
  status: string;
}

@Component({
  selector: 'app-resolucao-conflitos',
  imports: [RouterLink, AdminSidebar],
  templateUrl: './resolucao-conflitos.html',
  styleUrl: './resolucao-conflitos.css',
})
export class ResolucaoConflitos {
  sidebarOpen = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  modalAberto = false;
  conflitoSelecionado: Conflito | null = null;

  conflitos: Conflito[] = [
    {
      id: 1,
      sala: 'Sala 211',
      data: '12/08/2026',
      horario: '07:30 - 08:30',
      status: 'Pendente',
      solicitacaoA: {
        id: 101,
        responsavel: 'Lucas',
        turma: 'Mecânica 02',
        prioridade: 'Alta',
        status: 'Pendente',
      },
      solicitacaoB: {
        id: 102,
        responsavel: 'Maria',
        turma: 'Administração',
        prioridade: 'Baixa',
        status: 'Pendente',
      },
    },
    {
      id: 2,
      sala: 'Sala 105',
      data: '14/08/2026',
      horario: '09:00 - 10:00',
      status: 'Pendente',
      solicitacaoA: {
        id: 103,
        responsavel: 'Ana',
        turma: 'Informática 01',
        prioridade: 'Alta',
        status: 'Pendente',
      },
      solicitacaoB: {
        id: 104,
        responsavel: 'Pedro',
        turma: 'Eletrônica 02',
        prioridade: 'Baixa',
        status: 'Pendente',
      },
    },
  ];

  salasManutencao: SalaManutencao[] = [
    {
      nome: 'Laboratório 03',
      motivo: 'Manutenção dos computadores',
      status: 'Em manutenção',
    },
    {
      nome: 'Sala 204',
      motivo: 'Troca de lâmpadas',
      status: 'Aguardando reparo',
    },
  ];

  // CALENDÁRIO
  dataCalendario = new Date();
  hoje = new Date();

  diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  get mesAno(): string {
    const texto = this.dataCalendario.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });

    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  get diasCalendario(): (number | null)[] {
    const ano = this.dataCalendario.getFullYear();
    const mes = this.dataCalendario.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const dias: (number | null)[] = [];

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(dia);
    }

    return dias;
  }

  mesAnterior(): void {
    this.dataCalendario = new Date(
      this.dataCalendario.getFullYear(),
      this.dataCalendario.getMonth() - 1,
      1
    );
  }

  proximoMes(): void {
    this.dataCalendario = new Date(
      this.dataCalendario.getFullYear(),
      this.dataCalendario.getMonth() + 1,
      1
    );
  }

  ehHoje(dia: number | null): boolean {
    if (dia === null) return false;

    return (
      dia === this.hoje.getDate() &&
      this.dataCalendario.getMonth() === this.hoje.getMonth() &&
      this.dataCalendario.getFullYear() === this.hoje.getFullYear()
    );
  }

  get quantidadePendentes(): number {
    return this.conflitos.filter(
      conflito => conflito.status === 'Pendente'
    ).length;
  }

  abrirModal(conflito: Conflito): void {
    if (conflito.status === 'Resolvido') return;

    this.conflitoSelecionado = conflito;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.conflitoSelecionado = null;
  }

  confirmarAprovacao(): void {
    if (!this.conflitoSelecionado) return;

    this.conflitoSelecionado.solicitacaoA.status = 'Aprovada';
    this.conflitoSelecionado.solicitacaoB.status = 'Rejeitada';
    this.conflitoSelecionado.status = 'Resolvido';

    this.fecharModal();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
