
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgendaService, Schedule } from '../../services/agendaservice';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [FuncionarioSidebar],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class Agenda implements OnInit {

  schedules: Schedule[] = [];

  constructor(
    private agendaService: AgendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.schedules = this.agendaService.getSchedules();
  }

  get filteredSchedules(): Schedule[] {
    return this.schedules;
  }

  newSchedule(): void {
    this.router.navigateByUrl('/reserva');
  }

  deleteSchedule(id: number): void {
    if (!confirm('Deseja excluir este agendamento?')) {
      return;
    }

    this.agendaService.deleteSchedule(id);
    this.loadSchedules();
  }
}
