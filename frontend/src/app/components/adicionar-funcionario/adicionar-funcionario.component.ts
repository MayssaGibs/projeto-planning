import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adicionar-funcionario.component.html',
  styleUrls: ['./adicionar-funcionario.component.css'],
})
export class AdicionarFuncionarioComponent {
  private fb = inject(FormBuilder);

  foto: File | null = null;

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    designacao: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    numero: ['', Validators.required],
    turnos: ['', Validators.required],
    genero: ['', Validators.required],
    cursos: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(6)]],
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
    console.log('Funcionário:', this.form.value, this.foto);
    this.form.reset();
    this.foto = null;
  }

  cancelar(): void {
    this.form.reset();
    this.foto = null;
  }
}