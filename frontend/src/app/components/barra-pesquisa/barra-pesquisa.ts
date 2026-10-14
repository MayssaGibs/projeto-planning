
import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-pesquisa',
  standalone: true,
  templateUrl: './barra-pesquisa.html',
  styleUrl: './barra-pesquisa.css'
})
export class BarraPesquisa {
  modalAberto = false;

  abrir(): void {
    this.modalAberto = true;
  }

  fechar(): void {
    this.modalAberto = false;
  }
}
