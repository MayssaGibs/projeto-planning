import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
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
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const email = this.formulario.value.email ?? '';
    const senha = this.formulario.value.senha ?? '';
    const sucesso = this.authService.login(email, senha);

    if(sucesso){
    this.router.navigate(['/home']);
    }
  }

  recuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }
}