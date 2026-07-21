import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header">
      <div class="header-content">
        <h1 class="logo">Gestión de Cursos</h1>
        <nav class="nav">
          <a routerLink="/" class="nav-link">Inicio</a>
          <a routerLink="/courses" class="nav-link">Cursos</a>
          <a routerLink="/courses/new" class="nav-link">Nuevo Curso</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      font-size: 1.5rem;
      margin: 0;
    }
    .nav {
      display: flex;
      gap: 1.5rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
  `]
})
export class HeaderComponent {}