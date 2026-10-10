import { Injectable } from '@angular/core';


export interface Schedule {
  id: number;
  date: string;
  time: string;
  className: string;
  room: string;
  lab?: string;
  status: 'confirmado' | 'pendente';
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  // ============================================
  // DADOS DOS AGENDAMENTOS
  // ============================================

  private schedules: Schedule[] = [

    {
      id: 1,
      date: '2026-08-12',
      time: '07:30 - 11:30',
      className: 'INFORMÁTICA 01',
      room: '111',
      lab: 'LAB - A - 01',
      status: 'confirmado'
    },

    {
      id: 2,
      date: '2026-08-12',
      time: '13:00 - 17:00',
      className: 'INFORMÁTICA 02',
      room: '112',
      lab: 'LAB - B - 02',
      status: 'confirmado'
    },

    {
      id: 3,
      date: '2026-08-12',
      time: '19:00 - 22:00',
      className: 'DESENVOLVIMENTO WEB',
      room: '205',
      lab: 'LAB - A - 02',
      status: 'pendente'
    },

    {
      id: 4,
      date: '2026-08-13',
      time: '07:30 - 11:30',
      className: 'BANCO DE DADOS',
      room: '203',
      lab: 'LAB - B - 01',
      status: 'confirmado'
    },

    {
      id: 5,
      date: '2026-08-14',
      time: '13:00 - 17:00',
      className: 'PROGRAMAÇÃO',
      room: '205',
      lab: 'LAB - A - 02',
      status: 'confirmado'
    }

  ];

searchTerm = '';

get filteredSchedules(): Schedule[] {
  const term = this.searchTerm.trim().toLowerCase();

  return this.schedules.filter((schedule) =>
    [
      schedule.className,
      schedule.room,
      schedule.lab ?? '',
      schedule.time,
    ].some((value) => value.toLowerCase().includes(term))
  );
}

showNotifications(): void {
  alert('Você não tem notificações novas.');
}

showProfile(): void {
  alert('Perfil do utilizador');
}
  // ============================================
  // BUSCAR TODOS OS AGENDAMENTOS
  // ============================================

  getSchedules(): Schedule[] {

    return [...this.schedules];

  }


  // ============================================
  // BUSCAR AGENDAMENTOS DE UMA DATA
  // ============================================

  getSchedulesByDate(date: Date): Schedule[] {

    const formattedDate = this.formatDate(date);

    return this.schedules.filter(
      schedule => schedule.date === formattedDate
    );

  }


  // ============================================
  // BUSCAR UM AGENDAMENTO PELO ID
  // ============================================

  getScheduleById(id: number): Schedule | undefined {

    return this.schedules.find(
      schedule => schedule.id === id
    );

  }


  // ============================================
  // ADICIONAR AGENDAMENTO
  // ============================================

  addSchedule(
    schedule: Omit<Schedule, 'id'>
  ): Schedule {

    const newSchedule: Schedule = {

      id: this.generateId(),

      ...schedule

    };

    this.schedules.push(newSchedule);

    return newSchedule;

  }


  // ============================================
  // ATUALIZAR AGENDAMENTO
  // ============================================

  updateSchedule(
    id: number,
    data: Partial<Omit<Schedule, 'id'>>
  ): Schedule | undefined {

    const index = this.schedules.findIndex(
      schedule => schedule.id === id
    );

    if (index === -1) {

      return undefined;

    }


    this.schedules[index] = {

      ...this.schedules[index],

      ...data

    };


    return this.schedules[index];

  }


  // ============================================
  // EXCLUIR AGENDAMENTO
  // ============================================

  deleteSchedule(id: number): boolean {

    const index = this.schedules.findIndex(
      schedule => schedule.id === id
    );

    if (index === -1) {

      return false;

    }


    this.schedules.splice(index, 1);

    return true;

  }


  // ============================================
  // GERAR ID
  // ============================================

  private generateId(): number {

    if (this.schedules.length === 0) {

      return 1;

    }


    return Math.max(
      ...this.schedules.map(schedule => schedule.id)
    ) + 1;

  }


  // ============================================
  // FORMATAR DATA
  // ============================================

  private formatDate(date: Date): string {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      date.getDate()
    ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


}
