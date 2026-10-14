import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importação essencial para o routerLink funcionar
import { Manutencao } from '../../services/manutencaoservice';
import { ManutencaoService } from '../../services/manutencaoservice';



@Component({
  selector: 'app-admin-manutencao',
  standalone: true,
  imports: [FormsModule, RouterModule], // Adicionado RouterModule para habilitar a navegação nos botões
 templateUrl: './admin-manutencao.html',
  styleUrl: './admin-manutencao.css',
})
export class AdminManutencao implements OnInit {
  sidebarOpen = false;
  searchTerm = '';
  
  // Objeto estruturado baseado nos campos da sua imagem
  newManutencaoData: Omit<Manutencao, 'id'> = {
    nome: '',
    roomNumber: '',
    roomType: '',
    maintenanceDays: ''
  };

  constructor(private manutencaoService: ManutencaoService) {}

  ngOnInit(): void {
    // Inicializações necessárias caso precise carregar dados prévios
  }

  showNotifications(): void {
    alert('Não existem notificações novas.');
  }

  showProfile(): void {
    alert('Perfil do utilizador');
  }

  saveMaintenance(): void {
    // Validação básica se os campos estão preenchidos antes de salvar
    if (!this.newManutencaoData.nome || !this.newManutencaoData.roomNumber) {
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

    // Salvando os dados através do serviço simulado
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
