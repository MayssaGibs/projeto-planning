import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendario } from '../../components/calendario/calendario';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';
import { ReservaService, Horario } from '../../services/reserva';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [Calendario, FormsModule, FuncionarioSidebar],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva {

  tipoReserva: 'sala' | 'laboratorio' = 'sala';

  salas: string[] = [];
  laboratorios: string[] = [];
  turmas: string[] = [];
  horarios: Horario[] = [];

  localSelecionado = '';
  turmaSelecionada = '';
  prioridadeSelecionada = '';
  justificativaSelecionada = '';

  horarioSelecionado: Horario | null = null;

  modoReserva: 'unica' | 'mensal' = 'unica';
  mesSelecionado = '';

  datasDisponiveis: Date[] = [];
  datasSelecionadas: Date[] = [];

  inicioDatas = 0;
  quantidadeDatasVisiveis = 5;

  modalConfirmacaoAberto = false;
  mensagemSucesso = false;
  salvando = false; 

  constructor(private reservaService: ReservaService) {
    this.salas = this.reservaService.getSalas();
    this.laboratorios = this.reservaService.getLaboratorios();
    this.turmas = this.reservaService.getTurmas();
    this.horarios = this.reservaService.getHorarios();
    this.gerarDatas();
  }

  get titulo(): string {
    return this.tipoReserva === 'sala' ? 'Reserva de sala' : 'Reserva de laboratório';
  }

  selecionarTipo(tipo: 'sala' | 'laboratorio'): void {
    this.tipoReserva = tipo;
    this.localSelecionado = '';
    this.horarioSelecionado = null;
  }

  selecionarHorario(horario: Horario): void {
    if (horario.ocupado) return;
    this.horarioSelecionado = horario;
  }

  get horariosDisponiveis(): number {
    return this.horarios.filter(h => !h.ocupado).length;
  }

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

  get datasVisiveis(): Date[] {
    return this.datasDisponiveis.slice(this.inicioDatas, this.inicioDatas + this.quantidadeDatasVisiveis);
  }

  voltarDatas(): void { if (this.inicioDatas > 0) this.inicioDatas--; }

  avancarDatas(): void {
    if (this.inicioDatas + this.quantidadeDatasVisiveis < this.datasDisponiveis.length) {
      this.inicioDatas++;
    }
  }

  selecionarData(data: Date): void {
    if (this.modoReserva === 'mensal') {
      this.modoReserva = 'unica';
      this.mesSelecionado = '';
    }

    if (this.isDataSelecionada(data)) {
      this.datasSelecionadas = this.datasSelecionadas.filter(
        d => d.getDate() !== data.getDate() || d.getMonth() !== data.getMonth() || d.getFullYear() !== data.getFullYear()
      );
    } else {
      this.datasSelecionadas = [...this.datasSelecionadas, new Date(data)].sort((a, b) => a.getTime() - b.getTime());
    }
  }

  isDataSelecionada(data: Date): boolean {
    return this.datasSelecionadas.some(
      d => d.getDate() === data.getDate() && d.getMonth() === data.getMonth() && d.getFullYear() === data.getFullYear()
    );
  }

  formatarDataBotao(data: Date, index: number): string {
    if (index === 0) return 'Hoje';
    if (index === 1) return 'Amanhã';
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  formatarDataCompleta(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  formatarDataISO(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  formatarMesCompleto(mesAno: string): string {
    if (!mesAno) return '';
    const [ano, mes] = mesAno.split('-').map(Number);
    return new Date(ano, mes - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  trocarModo(modo: 'unica' | 'mensal'): void {
    this.modoReserva = modo;
    if (modo === 'mensal') {
      this.datasSelecionadas = [];
    } else {
      this.mesSelecionado = '';
    }
  }

  abrirConfirmacao(): void {
    if (!this.localSelecionado || !this.turmaSelecionada || !this.horarioSelecionado) {
      alert('Selecione o local, a turma e um horário.'); return;
    }
    if (this.horarioSelecionado.ocupado) {
      alert('Este horário já está ocupado.'); return;
    }
    if (this.modoReserva === 'unica' && this.datasSelecionadas.length === 0) {
      alert('Selecione pelo menos uma data.'); return;
    }
    if (this.modoReserva === 'mensal' && !this.mesSelecionado) {
      alert('Selecione o mês para a reserva mensal.'); return;
    }
    this.modalConfirmacaoAberto = true;
  }

  cancelarConfirmacao(): void {
    this.modalConfirmacaoAberto = false;
  }

  confirmarReserva(): void {
    if (this.salvando) return;
    if (!this.horarioSelecionado) return;

    const horario = `${this.horarioSelecionado.inicio} - ${this.horarioSelecionado.fim}`;

    const dadosParaSalvar = {
      tipo: (this.tipoReserva === 'sala' ? 'Sala' : 'Laboratório') as 'Sala' | 'Laboratório',
      local: this.localSelecionado,
      turma: this.turmaSelecionada,
      responsavel: 'Jaqueliny Silva',
      turno: 'Não informado',
      horario: horario,
      prioridade: (this.prioridadeSelecionada || 'Baixa') as 'Alta' | 'Média' | 'Baixa',
      justificativa: this.justificativaSelecionada || undefined
    };

    this.salvando = true;

    if (this.modoReserva === 'unica') {
      if (this.datasSelecionadas.length === 0) { 
        alert('Selecione pelo menos uma data.'); 
        this.salvando = false; 
        return; 
      }
      const datasFormatadas = this.datasSelecionadas.map(d => this.formatarDataISO(d));
      const resultado = this.reservaService.adicionarReservasEmLote(dadosParaSalvar, datasFormatadas);
      
      this.modalConfirmacaoAberto = false;
      this.salvando = false;
      
      if (resultado.criadas.length > 0) this.mensagemSucesso = true;
      if (resultado.conflitos.length > 0) {
        alert(`Foram criadas ${resultado.criadas.length} reserva(s).\n\nNão foi possível reservar ${resultado.conflitos.length} data(s) por conflito.`);
      }

    } else {
      if (!this.mesSelecionado) { 
        alert('Selecione o mês.'); 
        this.salvando = false; 
        return; 
      }
      
      const resultado = this.reservaService.adicionarReservaMensal(dadosParaSalvar, this.mesSelecionado);
      
      this.modalConfirmacaoAberto = false;
      this.salvando = false;

      if (resultado) {
        this.mensagemSucesso = true;
      } else {
        alert('Já existe uma reserva para este mês neste local e horário.');
      }
    }

    this.datasSelecionadas = [];
    this.horarioSelecionado = null;
    this.localSelecionado = '';
    this.turmaSelecionada = '';
    this.prioridadeSelecionada = '';
    this.justificativaSelecionada = '';
    this.mesSelecionado = '';
    this.modoReserva = 'unica';

    setTimeout(() => { this.mensagemSucesso = false; }, 3000);
  }
}