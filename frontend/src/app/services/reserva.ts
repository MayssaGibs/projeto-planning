import { Injectable, signal } from '@angular/core';

export interface Horario {
  inicio: string;
  fim: string;
  ocupado: boolean;
}

export interface Reserva {
  id: string;
  tipo: 'Sala' | 'Laboratório';
  local: string;
  turma: string;
  responsavel: string;
  data: string;
  turno: string;
  horario: string;
  status: 'Pendente' | 'Aprovada' | 'Recusada';
  criadaEm: string;
  prioridade?: 'Alta' | 'Média' | 'Baixa';
  justificativa?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private readonly STORAGE_KEY = 'planning_reservas';

  private salas = ['SALA 112', 'SALA 113', 'SALA 114'];
  private laboratorios = ['LAB - A - 01', 'LAB - A - 02', 'LAB - B - 01'];
  private turmas = ['INFORMÁTICA 01', 'INFORMÁTICA 02'];

  private horarios: Horario[] = [
    { inicio: '07:30', fim: '08:30', ocupado: true },
    { inicio: '08:30', fim: '09:45', ocupado: false },
    { inicio: '10:00', fim: '11:30', ocupado: false },
    { inicio: '14:40', fim: '15:20', ocupado: true },
    { inicio: '15:35', fim: '16:20', ocupado: false },
  ];

  private reservasSignal = signal<Reserva[]>(this.carregarReservas());
  reservas = this.reservasSignal.asReadonly();

  private carregarReservas(): Reserva[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  private salvarReservas(reservas: Reserva[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservas));
    this.reservasSignal.set(reservas);
  }

  listarReservas(): Reserva[] {
    return this.reservasSignal();
  }

  adicionarReserva(
    dados: Omit<Reserva, 'id' | 'status' | 'criadaEm'>
  ): Reserva | null {

    const reservas = this.reservasSignal();

    const conflito = reservas.some(reserva =>
      reserva.local === dados.local &&
      reserva.data === dados.data &&
      reserva.horario === dados.horario &&
      reserva.status !== 'Recusada'
    );

    if (conflito) return null;

    const novaReserva: Reserva = {
      ...dados,
      id: crypto.randomUUID(),
      status: 'Pendente',
      criadaEm: new Date().toISOString(),
    };

    this.salvarReservas([...reservas, novaReserva]);
    return novaReserva;
  }

  adicionarReservasEmLote(
    dados: Omit<Reserva, 'id' | 'status' | 'criadaEm' | 'data'>,
    datas: string[]
  ): { criadas: Reserva[]; conflitos: string[] } {

    const criadas: Reserva[] = [];
    const conflitos: string[] = [];
    
    const datasUnicas = [...new Set(datas)];

    for (const data of datasUnicas) {
      const reserva = this.adicionarReserva({ ...dados, data });
      if (reserva) {
        criadas.push(reserva);
      } else {
        conflitos.push(data);
      }
    }

    return { criadas, conflitos };
  }

  // MÉTODO NOVO: Cria 1 único card que representa o mês inteiro
  adicionarReservaMensal(
    dados: Omit<Reserva, 'id' | 'status' | 'criadaEm' | 'data'>,
    mesAno: string 
  ): Reserva | null {
    const reservas = this.reservasSignal();
    const [anoStr, mesStr] = mesAno.split('-');
    const ano = Number(anoStr);
    const mes = Number(mesStr) - 1;
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const dataInicio = `${anoStr}-${mesStr}-01`;
    const dataFim = `${anoStr}-${mesStr}-${String(ultimoDia).padStart(2, '0')}`;

    const conflito = reservas.some(reserva => 
      reserva.local === dados.local &&
      reserva.horario === dados.horario &&
      reserva.status !== 'Recusada' &&
      reserva.data >= dataInicio &&
      reserva.data <= dataFim
    );

    if (conflito) return null;

    const novaReserva: Reserva = {
      ...dados,
      id: crypto.randomUUID(),
      status: 'Pendente',
      criadaEm: new Date().toISOString(),
      data: `${mesAno}-MENSAL`, 
    };

    this.salvarReservas([...reservas, novaReserva]);
    return novaReserva;
  }

  alterarStatus(id: string, status: Reserva['status']): void {
    const reservasAtualizadas = this.reservasSignal().map(reserva =>
      reserva.id === id ? { ...reserva, status } : reserva
    );
    this.salvarReservas(reservasAtualizadas);
  }

  cancelarReserva(id: string): void {
    const reservasAtualizadas = this.reservasSignal().filter(
      reserva => reserva.id !== id
    );
    this.salvarReservas(reservasAtualizadas);
  }

  getSalas(): string[] { return this.salas; }
  getLaboratorios(): string[] { return this.laboratorios; }
  getTurmas(): string[] { return this.turmas; }
  getHorarios(): Horario[] { return this.horarios; }
}