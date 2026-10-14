
import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

interface SalaCadastrada {
  nome: string;
  numero: number;
  tipo: string;
}

@Component({
  selector: 'app-registrar-sala',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './registrar-sala.html',
  styleUrl: './registrar-sala.css'
})
export class RegistrarSala {

  private fb = inject(FormBuilder);
  private location = inject(Location);

  modalSucessoAberto = false;

  salaRegistrada: SalaCadastrada | null = null;

  // Lista temporária de salas cadastradas nesta página.
  salasCadastradas: SalaCadastrada[] = [];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    numero: [
      null as number | null,
      [Validators.required, Validators.min(1)]
    ],
    tipo: ['', Validators.required]
  });

  invalido(campo: string): boolean {
    const c = this.form.get(campo);

    return !!c && c.invalid && (c.dirty || c.touched);
  }

  adicionar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.getRawValue();

    const novaSala: SalaCadastrada = {
      nome: (dados.nome ?? '').trim(),
      numero: Number(dados.numero),
      tipo: dados.tipo ?? ''
    };

    // Cadastro temporário em memória.
    this.salasCadastradas.push(novaSala);

    console.log('Sala cadastrada:', novaSala);

    // Guarda os dados para mostrar no card.
    this.salaRegistrada = novaSala;

    // Abre o card de confirmação.
    this.modalSucessoAberto = true;

    // Limpa o formulário para o próximo cadastro.
    this.form.reset({
      nome: '',
      numero: null,
      tipo: ''
    });
  }

  fecharModal(): void {
    this.modalSucessoAberto = false;
    this.salaRegistrada = null;
  }

  cancelar(): void {
    this.form.reset({
      nome: '',
      numero: null,
      tipo: ''
    });
  }

  voltar(): void {
    this.location.back();
  }

  nomeTipoSala(tipo: string): string {
    switch (tipo) {
      case 'aula':
        return 'Sala de aula';

      case 'laboratorio':
        return 'Laboratório';

      default:
        return tipo;
    }
  }
}
