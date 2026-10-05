import { Component } from '@angular/core';
import { Calendario } from '../../components/calendario/calendario';

@Component({
  selector: 'app-home',
  imports: [Calendario],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  sidebarOpen = false;
}