import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registrar-sala',
  styleUrl: './registrar-sala.css',
  templateUrl: './registrar-sala.html',
})
export class RegistrarSala {
  private fb = inject(FormBuilder);
  private location = inject(Location);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    numero: [null as number | null, [Validators.required, Validators.min(1)]],
    tipo: ['', Validators.required],
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
    console.log('Sala:', this.form.value);
    this.form.reset();
  }

  cancelar(): void {
    this.form.reset();
  }

  voltar(): void {
    this.location.back();
  }
}

