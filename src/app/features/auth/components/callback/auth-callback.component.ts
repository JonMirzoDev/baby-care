import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="loading-message">
        <p>Completing sign in...</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: var(--bg-primary);
    }

    .loading-message {
      text-align: center;
      color: var(--text-primary);
      font-size: 1.2rem;
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // The auth state change listener in AuthService will handle the redirect
    // Just navigate to dashboard, the guard will redirect if not authenticated
    this.router.navigate(['/dashboard']);
  }
} 