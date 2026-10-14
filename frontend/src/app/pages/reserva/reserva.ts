
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Calendario } from '../../components/calendario/calendario';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

import { ReservaService, Horario } from '../../services/reserva';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    Calendario,
    FormsModule,
    FuncionarioSidebar
  ],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva {

  // =========================
  // DADOS DA RESERVA
  // =========================

  tipoReserva: 'sala' | 'laboratorio' = 'sala';

  salas: string[] = [];
  laboratorios: string[] = [];
  turmas: string[] = [];
  horarios: Horario[] = [];

  localSelecionado = '';
  turmaSelecionada = '';
  prioridadeSelecionada = '';

  horarioSelecionado: Horario | null = null;

  // =========================
  // DATAS
  // =========================

  datasDisponiveis: Date[] = [];
  dataSelecionada: Date = new Date();

  inicioDatas = 0;
  quantidadeDatasVisiveis = 5;

  // =========================
  // CONFIRMAÇÃO
  // =========================

  modalConfirmacaoAberto = false;
  mensagemSucesso = false;

  constructor(
    private reservaService: ReservaService
  ) {
    this.salas = this.reservaService.getSalas();
    this.laboratorios = this.reservaService.getLaboratorios();
    this.turmas = this.reservaService.getTurmas();
    this.horarios = this.reservaService.getHorarios();

    this.gerarDatas();
  }

  // =========================
  // TÍTULO DA PÁGINA
  // =========================

  get titulo(): string {
    return this.tipoReserva === 'sala'
      ? 'Reserva de sala'
      : 'Reserva de laboratório';
  }

  // =========================
  // SALAS E LABORATÓRIOS
  // =========================

  selecionarTipo(tipo: 'sala' | 'laboratorio'): void {
    this.tipoReserva = tipo;
    this.localSelecionado = '';
    this.horarioSelecionado = null;
  }

  // =========================
  // HORÁRIOS
  // =========================

  selecionarHorario(horario: Horario): void {
    if (horario.ocupado) {
      return;
    }

    this.horarioSelecionado = horario;
  }

  get horariosDisponiveis(): number {
    return this.horarios.filter(
      horario => !horario.ocupado
    ).length;
  }

  // =========================
  // GERAR DATAS DISPONÍVEIS
  // =========================

  gerarDatas(): void {
    const hoje = new Date();

    this.datasDisponiveis = [];

    for (let i = 0; i < 14; i++) {
      const data = new Date(hoje);

      data.setDate(hoje.getDate() + i);

      this.datasDisponiveis.push(data);
    }

    this.inicioDatas = 0;
  }

  // =========================
  // MOSTRAR 5 DATAS POR VEZ
  // =========================

  get datasVisiveis(): Date[] {
    return this.datasDisponiveis.slice(
      this.inicioDatas,
      this.inicioDatas + this.quantidadeDatasVisiveis
    );
  }

  // =========================
  // VOLTAR DATAS
  // =========================

  voltarDatas(): void {
    if (this.inicioDatas > 0) {
      this.inicioDatas--;
    }
  }

  // =========================
  // AVANÇAR DATAS
  // =========================

  avancarDatas(): void {
    if (
      this.inicioDatas + this.quantidadeDatasVisiveis <
      this.datasDisponiveis.length
    ) {
      this.inicioDatas++;
    }
  }

  // =========================
  // SELECIONAR DATA
  // =========================

  selecionarData(data: Date): void {
    this.dataSelecionada = data;
    this.horarioSelecionado = null;
  }

  // =========================
  // VERIFICAR DATA SELECIONADA
  // =========================

  isDataSelecionada(data: Date): boolean {
    return (
      data.getDate() === this.dataSelecionada.getDate() &&
      data.getMonth() === this.dataSelecionada.getMonth() &&
      data.getFullYear() === this.dataSelecionada.getFullYear()
    );
  }

  // =========================
  // FORMATAR DATA DO BOTÃO
  // =========================

  formatarDataBotao(data: Date, index: number): string {
    if (index === 0) {
      return 'Hoje';
    }

    if (index === 1) {
      return 'Amanhã';
    }

    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  }

  // =========================
  // FORMATAR DATA COMPLETA
  // =========================

  formatarDataCompleta(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  // =========================
  // ABRIR CONFIRMAÇÃO
  // =========================

  abrirConfirmacao(): void {
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

    if (this.horarioSelecionado.ocupado) {
      alert('Este horário já está ocupado.');
      return;
    }

    this.modalConfirmacaoAberto = true;
  }

  // =========================
  // CANCELAR CONFIRMAÇÃO
  // =========================

  cancelarConfirmacao(): void {
    this.modalConfirmacaoAberto = false;
  }

  // =========================
  // CONFIRMAR RESERVA
  // =========================

  confirmarReserva(): void {
    if (!this.horarioSelecionado) {
      return;
    }

    if (this.horarioSelecionado.ocupado) {
      this.modalConfirmacaoAberto = false;
      alert('Este horário já está ocupado.');
      return;
    }

    // Marca o horário como ocupado na lista atual.
    this.horarioSelecionado.ocupado = true;

    // Fecha o modal de confirmação.
    this.modalConfirmacaoAberto = false;

    // Exibe mensagem de sucesso.
    this.mensagemSucesso = true;

    // Limpa o horário selecionado.
    this.horarioSelecionado = null;

    setTimeout(() => {
      this.mensagemSucesso = false;
    }, 3000);
  }
}
