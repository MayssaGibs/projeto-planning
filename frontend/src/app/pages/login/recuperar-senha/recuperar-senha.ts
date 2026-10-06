import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  imports: [ReactiveFormsModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenha {

  formulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(private router: Router) {}

  enviar() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    alert(
      'Um link para redefinir sua senha foi enviado para o seu e-mail!'
    );
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}