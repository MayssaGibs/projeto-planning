import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

export interface Schedule {
  id: string;
  date: string;
  time: string;
  className: string;
  room: string;
  lab?: string;
  status: 'confirmado' | 'pendente' | 'recusado';
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [FuncionarioSidebar],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class Agenda implements OnInit {

  private reservaService = inject(ReservaService);
  private router = inject(Router);

  schedules: Schedule[] = [];

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    const reservas = this.reservaService.listarReservas();

    this.schedules = reservas.map(reserva => {
      let dataFormatada = reserva.data;
      
      if (reserva.data.includes('MENSAL')) {
        const [ano, mes] = reserva.data.split('-');
        dataFormatada = `Mensal (${mes}/${ano})`;
      } else {
        const [ano, mes, dia] = reserva.data.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
      }

      let statusAgenda: 'confirmado' | 'pendente' | 'recusado' = 'pendente';
      if (reserva.status === 'Aprovada') statusAgenda = 'confirmado';
      if (reserva.status === 'Recusada') statusAgenda = 'recusado';

      return {
        id: reserva.id,
        date: dataFormatada,
        time: reserva.horario,
        className: reserva.turma,
        room: reserva.local,
        lab: reserva.tipo === 'Laboratório' ? reserva.local : undefined,
        status: statusAgenda
      };
    });

    this.schedules.sort((a, b) => b.date.localeCompare(a.date));
  }

  get filteredSchedules(): Schedule[] {
    return this.schedules;
  }

  newSchedule(): void {
    this.router.navigateByUrl('/reserva');
  }
}