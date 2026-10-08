
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendario } from '../../components/calendario/calendario';
import { ReservaService, Horario } from '../../services/reserva';

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

  datasDisponiveis: Date[] = [];
  dataSelecionada: Date = new Date();

<<<<<<< HEAD
  // NAVEGAÇÃO ENTRE AS DATAS
  inicioDatas = 0;
  quantidadeDatasVisiveis = 5;

  // MOSTRAR 5 DATAS POR VEZ
=======
  // CONTROLE DAS DATAS
  inicioDatas = 0;
  quantidadeDatasVisiveis = 5;

>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
  get datasVisiveis(): Date[] {
    return this.datasDisponiveis.slice(
      this.inicioDatas,
      this.inicioDatas + this.quantidadeDatasVisiveis
    );
  }

<<<<<<< HEAD
  // VOLTAR DATAS
  voltarDatas(): void {
=======
  voltarDatas() {
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
    if (this.inicioDatas > 0) {
      this.inicioDatas--;
    }
  }

<<<<<<< HEAD
  // AVANÇAR DATAS
  avancarDatas(): void {
=======
  avancarDatas() {
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
    if (
      this.inicioDatas + this.quantidadeDatasVisiveis <
      this.datasDisponiveis.length
    ) {
      this.inicioDatas++;
    }
  }

<<<<<<< HEAD
=======
  // MODAL
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
  modalConfirmacaoAberto = false;
  mensagemSucesso = false;

  constructor(private reservaService: ReservaService) {
    this.salas = this.reservaService.getSalas();
    this.laboratorios = this.reservaService.getLaboratorios();
    this.turmas = this.reservaService.getTurmas();
    this.horarios = this.reservaService.getHorarios();

    this.gerarDatas();
  }

  selecionarTipo(tipo: 'sala' | 'laboratorio'): void {
    this.tipoReserva = tipo;
    this.localSelecionado = '';
  }

  selecionarHorario(horario: Horario): void {
    if (horario.ocupado) return;

    this.horarioSelecionado = horario;
  }

<<<<<<< HEAD
  gerarDatas(): void {
=======
  gerarDatas() {
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
    const hoje = new Date();
    this.datasDisponiveis = [];

    for (let i = 0; i < 14; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      this.datasDisponiveis.push(data);
    }

    this.inicioDatas = 0;
  }

<<<<<<< HEAD
  selecionarData(data: Date): void {
=======
  selecionarData(data: Date) {
>>>>>>> 663e806 (Adiciona páginas de perfil, histórico e reservas de sala)
    this.dataSelecionada = data;
  }

  isDataSelecionada(data: Date): boolean {
    return (
      data.getDate() === this.dataSelecionada.getDate() &&
      data.getMonth() === this.dataSelecionada.getMonth() &&
      data.getFullYear() === this.dataSelecionada.getFullYear()
    );
  }

  formatarDataBotao(data: Date, index: number): string {
    if (index === 0) return 'Hoje';
    if (index === 1) return 'Amanhã';

    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  }

  formatarDataCompleta(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  abrirConfirmacao(): void {
    if (
      !this.localSelecionado ||
      !this.turmaSelecionada ||
      !this.horarioSelecionado
    ) {
      alert('Selecione a sala/laboratório, a turma e um horário.');
      return;
    }

    this.modalConfirmacaoAberto = true;
  }

  cancelarConfirmacao(): void {
    this.modalConfirmacaoAberto = false;
  }

  confirmarReserva(): void {
    if (!this.horarioSelecionado) return;

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
