import { Injectable } from '@angular/core';

export interface Horario {
  inicio: string;
  fim: string;
  ocupado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private salas = [
    'SALA 112',
    'SALA 113',
    'SALA 114',
  ];

  private laboratorios = [
    'LAB - A - 01',
    'LAB - A - 02',
    'LAB - B - 01',
  ];

  private turmas = [
    'INFORMÁTICA 01',
    'INFORMÁTICA 02',
  ];

  private horarios: Horario[] = [
    {
      inicio: '07:30',
      fim: '08:30',
      ocupado: true,
    },
    {
      inicio: '08:30',
      fim: '09:45',
      ocupado: false,
    },
    {
      inicio: '10:00',
      fim: '11:30',
      ocupado: false,
    },
    {
      inicio: '14:40',
      fim: '15:20',
      ocupado: true,
    },
    {
      inicio: '15:35',
      fim: '16:20',
      ocupado: false,
    },
  ];

  getSalas(): string[] {
    return this.salas;
  }

  getLaboratorios(): string[] {
    return this.laboratorios;
  }

  getTurmas(): string[] {
    return this.turmas;
  }

  getHorarios(): Horario[] {
    return this.horarios;
  }
}