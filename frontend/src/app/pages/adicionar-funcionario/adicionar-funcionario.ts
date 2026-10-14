
import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

interface FuncionarioCadastrado {
  nome: string;
  designacao: string;
  email: string;
  numero: string;
  turnos: string;
  genero: string;
  cursos: string;
  fotoNome: string | null;
}

@Component({
  selector: 'app-adicionar-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './adicionar-funcionario.html',
  styleUrl: './adicionar-funcionario.css'
})
export class AdicionarFuncionario {

  private fb = inject(FormBuilder);
  private location = inject(Location);

  @ViewChild('inputFoto')
  inputFoto?: ElementRef<HTMLInputElement>;

  foto: File | null = null;

  modalSucessoAberto = false;

  funcionarioRegistrado: FuncionarioCadastrado | null = null;

  // Dados temporários, armazenados enquanto a página estiver aberta.
  funcionariosCadastrados: FuncionarioCadastrado[] = [];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    designacao: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    numero: ['', Validators.required],
    turnos: ['', Validators.required],
    genero: ['', Validators.required],
    cursos: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  invalido(campo: string): boolean {
    const c = this.form.get(campo);

    return !!c && c.invalid && (c.dirty || c.touched);
  }

  selecionarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.foto = input.files?.[0] ?? null;
  }

  adicionar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.getRawValue();

    const novoFuncionario: FuncionarioCadastrado = {
      nome: (dados.nome ?? '').trim(),
      designacao: (dados.designacao ?? '').trim(),
      email: (dados.email ?? '').trim(),
      numero: (dados.numero ?? '').trim(),
      turnos: dados.turnos ?? '',
      genero: dados.genero ?? '',
      cursos: (dados.cursos ?? '').trim(),
      fotoNome: this.foto?.name ?? null
    };

    // Não incluímos a senha na lista nem no card.
    this.funcionariosCadastrados.push(novoFuncionario);

    // Guarda os dados para exibir a confirmação.
    this.funcionarioRegistrado = novoFuncionario;

    this.modalSucessoAberto = true;

    // Limpa os campos para o próximo cadastro.
    this.limparFormulario();
  }

  fecharModal(): void {
    this.modalSucessoAberto = false;
    this.funcionarioRegistrado = null;
  }

  cancelar(): void {
    this.limparFormulario();
  }

  private limparFormulario(): void {
    this.form.reset({
      nome: '',
      designacao: '',
      email: '',
      numero: '',
      turnos: '',
      genero: '',
      cursos: '',
      senha: ''
    });

    this.foto = null;

    if (this.inputFoto) {
      this.inputFoto.nativeElement.value = '';
    }
  }

  voltar(): void {
    this.location.back();
  }

  nomeTurno(turno: string): string {
    switch (turno) {
      case 'manha':
        return 'Manhã';

      case 'tarde':
        return 'Tarde';

      case 'noite':
        return 'Noite';

      default:
        return turno;
    }
  }
}
