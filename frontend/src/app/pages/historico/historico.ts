
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

type StatusReserva = 'pendente' | 'confirmada' | 'cancelada';
type PrioridadeReserva = 'alta' | 'media' | 'baixa';

interface RegistroReserva {
  id: number;
  data: string;
  responsavel: string;
  identificacao: string;
  horario: string;
  sala: string;
  turma: string;
  prioridade: PrioridadeReserva;
  status: StatusReserva;
}

@Component({
  selector: 'app-historico',
  imports: [RouterLink],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {

  // CONTROLE DA BARRA LATERAL
  sidebarOpen = false;

  // SERVIÇOS DE NAVEGAÇÃO E AUTENTICAÇÃO
  private router = inject(Router);
  private authService = inject(AuthService);

  // DADOS DE EXEMPLO DOS REGISTROS
  registros: RegistroReserva[] = [
    {
      id: 1,
      data: '12/08/2026',
      responsavel: 'Jaqueliny Silva',
      identificacao: '001',
      horario: '07:30 - 11:30',
      sala: 'LAB - A - 01',
      turma: 'Informática 01',
      prioridade: 'alta',
      status: 'confirmada',
    },
    {
      id: 2,
      data: '13/08/2026',
      responsavel: 'Maria Oliveira',
      identificacao: '002',
      horario: '13:00 - 15:00',
      sala: 'Sala 02',
      turma: 'Informática 02',
      prioridade: 'media',
      status: 'pendente',
    },
    {
      id: 3,
      data: '14/08/2026',
      responsavel: 'Pedro Santos',
      identificacao: '003',
      horario: '08:00 - 10:00',
      sala: 'LAB - B - 02',
      turma: 'Administração 01',
      prioridade: 'baixa',
      status: 'cancelada',
    },
    {
      id: 4,
      data: '15/08/2026',
      responsavel: 'Ana Costa',
      identificacao: '004',
      horario: '10:00 - 12:00',
      sala: 'Sala 04',
      turma: 'Informática 03',
      prioridade: 'alta',
      status: 'pendente',
    },
  ];

  // CONTROLE DO MODAL
  registroSelecionado: RegistroReserva | null = null;

  // ABRIR DETALHES DA RESERVA
  verMais(registro: RegistroReserva): void {
    this.registroSelecionado = registro;
  }

  // FECHAR DETALHES DA RESERVA
  fecharDetalhes(): void {
    this.registroSelecionado = null;
  }

  // CANCELAR RESERVA
  cancelarReserva(registro: RegistroReserva): void {
    if (registro.status === 'cancelada') {
      return;
    }

    const confirmar = window.confirm(
      'Tem certeza que deseja cancelar esta reserva?'
    );

    if (confirmar) {
      registro.status = 'cancelada';
      window.alert('Reserva cancelada com sucesso!');
    }
  }

  // SAIR DA CONTA
  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
