import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Calendario } from '../../components/calendario/calendario';

@Component({
  selector: 'app-home',
  imports: [Calendario, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  sidebarOpen = false;
}