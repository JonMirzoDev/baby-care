import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Baby Care Dashboard</h1>
      
      <div class="dashboard-grid">
        <div class="card">
          <h3>Recent Activities</h3>
          <p>No recent activities</p>
        </div>
        
        <div class="card">
          <h3>Today's Schedule</h3>
          <p>No scheduled activities</p>
        </div>
        
        <div class="card">
          <h3>Growth Tracking</h3>
          <p>No growth data available</p>
        </div>
        
        <div class="card">
          <h3>Milestones</h3>
          <p>No milestones recorded</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 0;
    }

    h1 {
      margin: 0 0 2rem 0;
      color: #333;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 0;
    }

    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
    }
  `]
})
export class DashboardComponent {} 