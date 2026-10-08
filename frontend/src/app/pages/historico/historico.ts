import { Component } from '@angular/core';

@Component({
  selector: 'app-historico',
  imports: [],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {

  cancelarReserva() {
    const confirmar = window.confirm(
      'Tem certeza que deseja cancelar esta reserva?'
    );

    if (confirmar) {
      window.alert('Reserva cancelada com sucesso!');
    }
  }

}
