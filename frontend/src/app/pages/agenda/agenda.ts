
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgendaService, Schedule } from '../../services/agendaservice';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  sidebarOpen = false;
  searchTerm = '';
  schedules: Schedule[] = [];

  constructor(private AgendaService: AgendaService) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.schedules = this.AgendaService.getSchedules();
  }

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
    alert('Não existem notificações novas.');
  }

  showProfile(): void {
    alert('Perfil do utilizador');
  }

  newSchedule(): void {
    alert('O formulário de novo agendamento será implementado aqui.');
  }

  deleteSchedule(id: number): void {
    if (!confirm('Deseja excluir este agendamento?')) {
      return;
    }

    this.AgendaService.deleteSchedule(id);
    this.loadSchedules();
  }
}
