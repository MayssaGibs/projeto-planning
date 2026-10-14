import { Injectable } from '@angular/core';

// Interface que espelha os campos exatos do seu formulário de manutenção
export interface Manutencao {
  id: number;
  nome: string;
  roomNumber: string;
  roomType: string;
  maintenanceDays: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  // ============================================
  // DADOS DAS MANUTENÇÕES (Mock Inicial)
  // ============================================
  private maintenances: Manutencao[] = [
    {
      id: 1,
      nome: 'Troca de lâmpadas LED',
      roomNumber: '111',
      roomType: 'Sala de Aula',
      maintenanceDays: '2 dias'
    },
    {
      id: 2,
      nome: 'Reparo nos computadores',
      roomNumber: 'LAB - A - 01',
      roomType: 'Laboratório',
      maintenanceDays: '5 dias'
    }
  ];

  searchTerm = '';

  // Mecanismo de filtro idêntico ao da sua agenda
  get filteredMaintenances(): Manutencao[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.maintenances.filter((maintenance) =>
      [
        maintenance.nome,
        maintenance.roomNumber,
        maintenance.roomType,
        maintenance.maintenanceDays,
      ].some((value) => value.toLowerCase().includes(term))
    );
  }

  // ============================================
  // BUSCAR TODAS AS MANUTENÇÕES
  // ============================================
  getMaintenances(): Manutencao[] {
    return [...this.maintenances];
  }

  // ============================================
  // BUSCAR UMA MANUTENÇÃO PELO ID
  // ============================================
  getMaintenanceById(id: number): Manutencao | undefined {
    return this.maintenances.find(
      maintenance => maintenance.id === id
    );
  }

  // ============================================
  // ADICIONAR MANUTENÇÃO
  // ============================================
  addMaintenance(
    maintenance: Omit<Manutencao, 'id'>
  ): Manutencao {
    const newMaintenance: Manutencao = {
      id: this.generateId(),
      ...maintenance
    };

    this.maintenances.push(newMaintenance);
    return newMaintenance;
  }

  // ============================================
  // ATUALIZAR MANUTENÇÃO
  // ============================================
  updateMaintenance(
    id: number,
    data: Partial<Omit<Manutencao, 'id'>>
  ): Manutencao | undefined {
    const index = this.maintenances.findIndex(
      maintenance => maintenance.id === id
    );

    if (index === -1) {
      return undefined;
    }

    this.maintenances[index] = {
      ...this.maintenances[index],
      ...data
    };

    return this.maintenances[index];
  }

  // ============================================
  // EXCLUIR MANUTENÇÃO
  // ============================================
  deleteMaintenance(id: number): boolean {
    const index = this.maintenances.findIndex(
      maintenance => maintenance.id === id
    );

    if (index === -1) {
      return false;
    }

    this.maintenances.splice(index, 1);
    return true;
  }

  // ============================================
  // GERAR ID (Seguindo o padrão lógico da agenda)
  // ============================================
  private generateId(): number {
    if (this.maintenances.length === 0) {
      return 1;
    }

    return Math.max(
      ...this.maintenances.map(maintenance => maintenance.id)
    ) + 1;
  }
}