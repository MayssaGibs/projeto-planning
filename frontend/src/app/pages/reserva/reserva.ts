import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendario } from '../../components/calendario/calendario';
import {
  ReservaService,
  Horario,
} from '../../services/reserva';

@Component({
  selector: 'app-reserva',
  imports: [Calendario, FormsModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
})
export class Reserva {
  sidebarOpen = false;

  tipoReserva: 'sala' | 'laboratorio' = 'sala';

  salas: string[] = [];
  laboratorios: string[] = [];
  turmas: string[] = [];
  horarios: Horario[] = [];

  localSelecionado = '';
  turmaSelecionada = '';
  prioridadeSelecionada = '';

  horarioSelecionado: Horario | null = null;

  // DATAS
  datasDisponiveis: Date[] = [];
  dataSelecionada: Date = new Date();

  modalConfirmacaoAberto = false;
  mensagemSucesso = false;

  constructor(private reservaService: ReservaService) {
    this.salas = this.reservaService.getSalas();
    this.laboratorios = this.reservaService.getLaboratorios();
    this.turmas = this.reservaService.getTurmas();
    this.horarios = this.reservaService.getHorarios();

    this.gerarDatas();
  }

  selecionarTipo(tipo: 'sala' | 'laboratorio') {
    this.tipoReserva = tipo;

    // Limpa o local ao trocar entre Sala e Lab
    this.localSelecionado = '';
  }

  selecionarHorario(horario: Horario) {
    if (horario.ocupado) {
      return;
    }

    this.horarioSelecionado = horario;
  }

  // GERA OS PRÓXIMOS 14 DIAS
  gerarDatas() {
    const hoje = new Date();

    this.datasDisponiveis = [];

    for (let i = 0; i < 14; i++) {
      const data = new Date(hoje);

      data.setDate(hoje.getDate() + i);

      this.datasDisponiveis.push(data);
    }
  }

  // SELECIONA UMA DATA
  selecionarData(data: Date) {
    this.dataSelecionada = data;
  }

  // VERIFICA QUAL DATA ESTÁ SELECIONADA
  isDataSelecionada(data: Date): boolean {
    return (
      data.getDate() === this.dataSelecionada.getDate() &&
      data.getMonth() === this.dataSelecionada.getMonth() &&
      data.getFullYear() === this.dataSelecionada.getFullYear()
    );
  }

  // TEXTO DOS BOTÕES
  formatarDataBotao(data: Date, index: number): string {
    if (index === 0) {
      return 'Hoje';
    }

    if (index === 1) {
      return 'Amanhã';
    }

    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  }

  // DATA PARA A CONFIRMAÇÃO
  formatarDataCompleta(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  abrirConfirmacao() {
    if (
      !this.localSelecionado ||
      !this.turmaSelecionada ||
      !this.horarioSelecionado
    ) {
      alert(
        'Selecione a sala/laboratório, a turma e um horário.'
      );

      return;
    }

    this.modalConfirmacaoAberto = true;
  }

  cancelarConfirmacao() {
    this.modalConfirmacaoAberto = false;
  }

  confirmarReserva() {
    if (!this.horarioSelecionado) {
      return;
    }

    // Depois de reservar, o horário fica ocupado
    this.horarioSelecionado.ocupado = true;

    this.modalConfirmacaoAberto = false;
    this.mensagemSucesso = true;

    this.horarioSelecionado = null;

    setTimeout(() => {
      this.mensagemSucesso = false;
    }, 3000);
  }

  get titulo(): string {
    return this.tipoReserva === 'sala'
      ? 'Reserva de sala'
      : 'Reserva de laboratório';
  }
}