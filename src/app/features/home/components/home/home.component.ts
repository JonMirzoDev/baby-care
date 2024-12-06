import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <header class="hero">
        <h1>Welcome to Baby Care</h1>
        <p class="subtitle">The smart way to track your baby's growth and development</p>
        
        <div class="cta-buttons">
          <ng-container *ngIf="!(authService.isAuthenticated$ | async); else dashboardLink">
            <a routerLink="/auth/login" class="btn btn-primary">Login</a>
            <a routerLink="/auth/register" class="btn btn-secondary">Register</a>
          </ng-container>
          <ng-template #dashboardLink>
            <a routerLink="/dashboard" class="btn btn-primary">Go to Dashboard</a>
          </ng-template>
        </div>
      </header>

      <section class="features">
        <h2>Why Choose Baby Care?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Track Growth</h3>
            <p>Monitor your baby's height, weight, and other important metrics</p>
          </div>
          <div class="feature-card">
            <h3>Daily Activities</h3>
            <p>Log feedings, diaper changes, sleep patterns, and more</p>
          </div>
          <div class="feature-card">
            <h3>Milestone Tracking</h3>
            <p>Never miss important developmental milestones</p>
          </div>
          <div class="feature-card">
            <h3>Health Records</h3>
            <p>Keep vaccination records and medical history in one place</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(to right, #e3f2fd, #bbdefb);
      border-radius: 12px;
      margin-bottom: 4rem;
    }

    h1 {
      font-size: 3rem;
      color: #1976d2;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.5rem;
      color: #424242;
      margin-bottom: 2rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 2rem;
      border-radius: 6px;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
    }

    .btn-primary:hover {
      background-color: #1565c0;
    }

    .btn-secondary {
      background-color: white;
      color: #1976d2;
      border: 2px solid #1976d2;
    }

    .btn-secondary:hover {
      background-color: #e3f2fd;
    }

    .features {
      padding: 2rem 0;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 3rem;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-card h3 {
      color: #1976d2;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 3rem 1rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.25rem;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
} 