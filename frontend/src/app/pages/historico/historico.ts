import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';
import { ReservaService, Reserva as ReservaModel } from '../../services/reserva';

type StatusReserva = 'pendente' | 'confirmada' | 'cancelada';
type PrioridadeReserva = 'alta' | 'media' | 'baixa' | 'nao-informada';

interface RegistroReserva {
  id: string;
  data: string;
  dataISO: string;
  responsavel: string;
  identificacao: string;
  horario: string;
  sala: string;
  turma: string;
  prioridade: PrioridadeReserva;
  justificativa: string;
  status: StatusReserva;
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [RouterLink, AdminSidebar],
  templateUrl: './historico.html',
  styleUrl: './historico.css'
})
export class Historico {

  private reservaService = inject(ReservaService);
  registroSelecionado: RegistroReserva | null = null;

  get registros(): RegistroReserva[] {
    return this.reservaService.listarReservas()
      .map(reserva => this.mapearReserva(reserva))
      .sort((a, b) => b.dataISO.localeCompare(a.dataISO));
  }

  private mapearReserva(reserva: ReservaModel): RegistroReserva {
    return {
      id: reserva.id,
      data: this.formatarDataBR(reserva.data),
      dataISO: reserva.data,
      responsavel: reserva.responsavel || '—',
      identificacao: '#' + reserva.id.slice(0, 6).toUpperCase(),
      horario: reserva.horario,
      sala: reserva.local,
      turma: reserva.turma,
      prioridade: this.mapearPrioridade(reserva.prioridade),
      justificativa: reserva.justificativa || '—',
      status: this.mapearStatus(reserva.status)
    };
  }

  private mapearStatus(status: ReservaModel['status']): StatusReserva {
    switch (status) {
      case 'Aprovada': return 'confirmada';
      case 'Recusada': return 'cancelada';
      default: return 'pendente';
    }
  }

  private mapearPrioridade(prioridade: ReservaModel['prioridade']): PrioridadeReserva {
    switch (prioridade) {
      case 'Alta': return 'alta';
      case 'Média': return 'media';
      case 'Baixa': return 'baixa';
      default: return 'nao-informada';
    }
  }

  private formatarDataBR(dataISO: string): string {
    if (dataISO.includes('MENSAL')) {
      const [ano, mes] = dataISO.split('-');
      const data = new Date(Number(ano), Number(mes) - 1, 1);
      const mesNome = data.toLocaleDateString('pt-BR', { month: 'long' });
      return `Mês de ${mesNome.charAt(0).toUpperCase() + mesNome.slice(1)} (Mensal)`;
    }
    
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  verMais(registro: RegistroReserva): void { this.registroSelecionado = registro; }
  fecharDetalhes(): void { this.registroSelecionado = null; }

  aprovarReserva(registro: RegistroReserva): void {
    if (registro.status === 'confirmada') return;
    if (!window.confirm('Confirmar aprovação desta reserva?')) return;
    this.reservaService.alterarStatus(registro.id, 'Aprovada');
    this.fecharDetalhes();
  }

  recusarReserva(registro: RegistroReserva): void {
    if (registro.status === 'cancelada') return;
    if (!window.confirm('Tem certeza que deseja recusar esta reserva?')) return;
    this.reservaService.alterarStatus(registro.id, 'Recusada');
    this.fecharDetalhes();
  }

  cancelarReserva(registro: RegistroReserva): void {
    if (registro.status === 'cancelada') return;
    if (!window.confirm('Tem certeza que deseja excluir esta reserva? (não pode ser desfeito)')) return;
    this.reservaService.cancelarReserva(registro.id);
    this.fecharDetalhes();
  }
}