import { Component } from '@angular/core';
import {ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms';


import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  entrar() {
    this.mensagem = '';
    this.tipoMensagem = '';

    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.mensagem = 'Verifique o e-mail e a senha.';
      this.tipoMensagem = 'erro';
      return;
    }

    const email = this.formulario.value.email ?? '';
    const senha = this.formulario.value.senha ?? '';

    const loginRealizado = this.authService.login(email, senha);

    if (!loginRealizado) {
      this.mensagem = 'Não foi possível realizar o login.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.mensagem = 'Login realizado com sucesso!';
    this.tipoMensagem = 'sucesso';

    setTimeout(() => {
      if (this.authService.admin()) {
        // Página inicial do David (administrador)
        this.router.navigate(['/resolucao-conflitos']);
      } else {
        // Página inicial dos usuários comuns (Jaqueliny)
        this.router.navigate(['/home']);
      }
    }, 1000);
  }

  recuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }
}