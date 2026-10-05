import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  imports: [],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {

  // Mês que está sendo exibido
currentDate = new Date(2026, 7, 1);

// Dia selecionado
selectedDate: Date | null = new Date(2026, 7, 12);


  // ============================================
  // VOLTAR UM MÊS
  // ============================================

  previousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
  }


  // ============================================
  // AVANÇAR UM MÊS
  // ============================================

  nextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
  }


  // ============================================
  // SELECIONAR DIA
  // ============================================

  selectDate(date: Date): void {
    this.selectedDate = date;
  }


  // ============================================
  // NOME DO MÊS
  // ============================================

  get monthName(): string {

    return this.currentDate.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
        year: 'numeric'
      }
    );

  }


  // ============================================
  // DIAS DO MÊS
  // ============================================

  get calendarDays(): Date[] {

    const year = this.currentDate.getFullYear();

    const month = this.currentDate.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    );

    const lastDay = new Date(
      year,
      month + 1,
      0
    );


    const days: Date[] = [];


    // Domingo = 0
    // Segunda = 1
    // ...
    // Sábado = 6

    let startDay = firstDay.getDay();

    // Faz a semana começar na segunda-feira
    startDay = startDay === 0 ? 6 : startDay - 1;


    // Dias do mês anterior
    for (let i = startDay - 1; i >= 0; i--) {

      days.push(
        new Date(
          year,
          month,
          -i
        )
      );

    }


    // Dias do mês atual
    for (
      let day = 1;
      day <= lastDay.getDate();
      day++
    ) {

      days.push(
        new Date(
          year,
          month,
          day
        )
      );

    }


    // Completa a última semana
    while (days.length % 7 !== 0) {

      days.push(
        new Date(
          year,
          month + 1,
          days.length -
          lastDay.getDate() -
          startDay +
          1
        )
      );

    }


    return days;

  }


  // ============================================
  // VERIFICA SE O DIA ESTÁ SELECIONADO
  // ============================================

  isSelected(date: Date): boolean {

    if (!this.selectedDate) {
      return false;
    }

    return (
      date.getFullYear() ===
      this.selectedDate.getFullYear()

      &&

      date.getMonth() ===
      this.selectedDate.getMonth()

      &&

      date.getDate() ===
      this.selectedDate.getDate()
    );

  }


  // ============================================
  // VERIFICA SE O DIA PERTENCE AO MÊS ATUAL
  // ============================================

  isCurrentMonth(date: Date): boolean {

    return (
      date.getMonth() ===
      this.currentDate.getMonth()

      &&

      date.getFullYear() ===
      this.currentDate.getFullYear()
    );

  }

}