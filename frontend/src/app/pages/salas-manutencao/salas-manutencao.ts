
import { Component } from '@angular/core';

import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

interface RoomMaintenance {
  id: number;
  number: string;
  name: string;
  location: string;
  reason: string;
}

@Component({
  selector: 'salas-manutencao',
  standalone: true,
  imports: [FuncionarioSidebar],
  templateUrl: './salas-manutencao.html',
  styleUrl: './salas-manutencao.css'
})
export class SalasManutencao {

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
