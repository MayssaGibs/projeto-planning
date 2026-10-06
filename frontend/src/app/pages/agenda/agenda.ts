import { Component } from '@angular/core';

interface Schedule {
  id: number;
  time: string;
  className: string;
  room: string;
  lab?: string;
  status: 'confirmado' | 'pendente';
}

@Component({
  selector: 'app-agenda',

  imports: [],

  templateUrl: './agenda.html',

  styleUrl: './agenda.css',
})
export class Agenda {

  sidebarOpen = false;
  startTime = '07:30';

  endTime = '11:30';


  // ============================================
  // AGENDAMENTOS
  // ============================================

  schedules: Schedule[] = [

    {
      id: 1,
      time: '07:30',
      className: 'INFORMÁTICA 01',
      room: '111',
      lab: 'LAB - A - 01',
      status: 'confirmado'
    },

    {
      id: 2,
      time: '13:00',
      className: 'INFORMÁTICA 02',
      room: '112',
      lab: 'LAB - B - 02',
      status: 'confirmado'
    },

    {
      id: 3,
      time: '19:00',
      className: 'DESENVOLVIMENTO WEB',
      room: '205',
      lab: 'LAB - A - 02',
      status: 'pendente'
    }

  ];


  // ============================================
  // NOVO AGENDAMENTO
  // ============================================

  newSchedule(): void {

    console.log('Novo agendamento');

  }

}
