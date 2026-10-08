import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css',
})
export class EditarPerfil {
  tipoUsuario = 'funcionario';

  isAdministrador(): boolean {
    return this.tipoUsuario === 'administrador';
  }

  isFuncionario(): boolean {
    return this.tipoUsuario === 'funcionario';
  }

  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  mensagemSenha = '';

  validarSenha(): boolean {
    if (!this.senhaAtual) {
      this.mensagemSenha = 'Digite sua senha atual.';
      return false;
    }

    if (!this.novaSenha) {
      this.mensagemSenha = 'Digite a nova senha.';
      return false;
    }

    if (!this.confirmarSenha) {
      this.mensagemSenha = 'Confirme a nova senha.';
      return false;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagemSenha =
        'A nova senha e a confirmação não são iguais.';
      return false;
    }

    this.mensagemSenha = 'Senha alterada com sucesso!';
    return true;
  }
}
