import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  mostrarSenha = false;
  mensagem = '';
  tipoMensagem = '';

  formulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    senha: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router) {}

  entrar() {
    this.mensagem = '';
    this.tipoMensagem = '';

    this.formulario.markAllAsTouched();

    // Verifica se os campos são válidos
    if (this.formulario.invalid) {
      this.mensagem = 'Verifique o e-mail e a senha.';
      this.tipoMensagem = 'erro';
      return;
    }

    // Formulário preenchido corretamente
    this.mensagem = 'Dados preenchidos! Entrando...';
    this.tipoMensagem = 'sucesso';

    // Navega para a página inicial
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  recuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }
}
