import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Baby Care Dashboard</h1>
      <div class="dashboard-content">
        <p>Welcome to your baby care dashboard!</p>
        <!-- Dashboard content will go here -->
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }
    .dashboard-content {
      margin-top: 2rem;
    }
  `]
})
export class DashboardComponent {
  // Dashboard logic will go here
} 