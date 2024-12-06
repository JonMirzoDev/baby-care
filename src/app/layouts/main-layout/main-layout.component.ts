import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/services/auth.service';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="layout">
      <header>
        <nav>
          <div class="logo">
            <a routerLink="/" class="brand">Baby Care</a>
          </div>
          
          <div class="nav-links">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <ng-container *ngIf="authService.isAuthenticated$ | async; else loginButton">
              <a routerLink="/profile" routerLinkActive="active">Profile</a>
              <button class="btn-logout" (click)="authService.logout()">Logout</button>
            </ng-container>
            <ng-template #loginButton>
              <a routerLink="/auth/login" class="btn-login" routerLinkActive="active">Login</a>
            </ng-template>
            <button class="theme-toggle" (click)="themeService.toggleTheme()">
              <ng-container *ngIf="themeService.isDarkTheme$ | async; else lightIcon">
                🌞
              </ng-container>
              <ng-template #lightIcon>
                🌙
              </ng-template>
            </button>
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
      background-color: var(--bg-primary);
      box-shadow: 0 2px 4px var(--shadow-color);
      margin: 0;
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1000;
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

    .logo {
      display: flex;
      align-items: center;
    }

    .brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--accent-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .brand:hover {
      color: var(--accent-hover);
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text-secondary);
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      color: var(--accent-color);
      background-color: var(--bg-secondary);
    }

    .nav-links a.active {
      color: var(--accent-color);
      background-color: var(--bg-secondary);
    }

    .btn-login {
      background-color: var(--accent-color) !important;
      color: #ffffff !important;
    }

    .btn-login:hover {
      background-color: var(--accent-hover) !important;
    }

    .btn-logout {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: var(--danger-color);
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-logout:hover {
      background-color: var(--danger-hover);
    }

    .theme-toggle {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: transparent;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .theme-toggle:hover {
      transform: scale(1.1);
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
      background-color: var(--bg-primary);
      border-top: 1px solid var(--border-color);
      padding: 1rem;
      text-align: center;
      margin-top: auto;
    }

    footer p {
      margin: 0;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      nav {
        padding: 1rem;
      }

      .nav-links {
        gap: 0.5rem;
      }

      .nav-links a {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.initializeTheme();
  }
} 