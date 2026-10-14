
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Manutencao,
  ManutencaoService
} from '../../services/manutencaoservice';

import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-manutencao',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './admin-manutencao.html',
  styleUrl: './admin-manutencao.css'
})
export class AdminManutencao implements OnInit {

  searchTerm = '';

  newManutencaoData: Omit<Manutencao, 'id'> = {
    nome: '',
    roomNumber: '',
    roomType: '',
    maintenanceDays: ''
  };

  constructor(
    private manutencaoService: ManutencaoService
  ) {}

  ngOnInit(): void {
    // Mantido para futuras inicializações.
  }

  showNotifications(): void {
    alert('Não existem notificações novas.');
  }

  saveMaintenance(): void {
    if (
      !this.newManutencaoData.nome.trim() ||
      !this.newManutencaoData.roomNumber.trim()
    ) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const manutencao = {
      ...this.newManutencaoData,
      nome: this.newManutencaoData.nome.trim(),
      roomNumber: this.newManutencaoData.roomNumber.trim(),
      roomType: this.newManutencaoData.roomType.trim(),
      maintenanceDays: this.newManutencaoData.maintenanceDays.trim()
    };

    this.manutencaoService.addMaintenance(manutencao);

    alert('Manutenção salva com sucesso!');
    this.resetForm();
  }

  resetForm(): void {
    this.newManutencaoData = {
      nome: '',
      roomNumber: '',
      roomType: '',
      maintenanceDays: ''
    };

    this.searchTerm = '';
  }
}
