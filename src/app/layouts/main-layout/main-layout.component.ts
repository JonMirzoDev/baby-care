import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="layout">
      <header>
        <nav>
          <h1>Baby Care</h1>
          <div class="nav-links">
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/auth/login">Logout</a>
          </div>
        </nav>
      </header>
      
      <main>
        <router-outlet></router-outlet>
      </main>
      
      <footer>
        <p>© 2024 Baby Care. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
      margin: 0;
      padding: 0;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-links a {
      text-decoration: none;
      color: #333;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

    .nav-links a:hover {
      background-color: #e9ecef;
    }

    main {
      flex: 1;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      box-sizing: border-box;
    }

    footer {
      background-color: #f8f9fa;
      border-top: 1px solid #dee2e6;
      padding: 1rem;
      text-align: center;
      margin-top: auto;
    }

    footer p {
      margin: 0;
    }
  `]
})
export class MainLayoutComponent {} 