import { Component } from '@angular/core';

interface RoomMaintenance {
  id: number;
  number: string;
  name: string;
  location: string;
  reason: string;
}

@Component({
  selector: 'app-salas-em-manutencao',

  imports: [],

  templateUrl: './salas-manutencao.html',

  styleUrl: './salas-manutencao.css',
})
export class SalasEmManutencao {
  sidebarOpen = false;


  rooms: RoomMaintenance[] = [

    {
      id: 1,
      number: '111',
      name: 'Sala de Informática',
      location: 'Bloco A',

      reason: 'Manutenção nos computadores'
    },

    {
      id: 2,
      number: '205',
      name: 'Laboratório de Redes',
      location: 'Bloco B',

      reason: 'Manutenção elétrica'
    },

    {
      id: 3,
      number: '302',
      name: 'Laboratório de Hardware',
      location: 'Bloco C',

      reason: 'Troca de equipamentos'
    }

  ];


}
