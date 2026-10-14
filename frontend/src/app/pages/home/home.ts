
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Calendario } from '../../components/calendario/calendario';
import { FuncionarioSidebar } from '../../components/funcionario-sidebar/funcionario-sidebar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Calendario,
    RouterLink,
    FuncionarioSidebar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
