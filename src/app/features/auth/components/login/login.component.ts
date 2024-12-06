import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="logo-section">
          <h1>Baby Care</h1>
          <p class="tagline">Track your baby's growth with love</p>
        </div>

        <div class="auth-section">
          <button class="btn-google" (click)="signInWithGoogle()">
            <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div class="error-message" *ngIf="(authService.error$ | async) as error">
            {{ error }}
          </div>
        </div>

        <div class="info-section">
          <p>By continuing, you agree to our</p>
          <div class="links">
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      padding: 1rem;
    }

    .login-container {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      background: var(--bg-primary);
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .logo-section {
      margin-bottom: 2.5rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--accent-color);
      margin: 0;
      letter-spacing: -0.5px;
    }

    .tagline {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin: 0.5rem 0 0;
    }

    .auth-section {
      margin-bottom: 2rem;
    }

    .btn-google {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      background-color: white;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-google:hover {
      background-color: var(--bg-secondary);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-google:active {
      transform: translateY(0);
    }

    .google-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .error-message {
      margin-top: 1rem;
      color: var(--danger-color);
      font-size: 0.875rem;
      background-color: rgba(244, 67, 54, 0.1);
      padding: 0.75rem;
      border-radius: 6px;
    }

    .info-section {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .info-section p {
      margin: 0 0 0.5rem;
    }

    .links {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
    }

    .links a {
      color: var(--accent-color);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .links a:hover {
      color: var(--accent-hover);
      text-decoration: underline;
    }

    .links span {
      color: var(--text-secondary);
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 2rem;
      }

      h1 {
        font-size: 2rem;
      }

      .tagline {
        font-size: 1rem;
      }
    }
  `]
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  async signInWithGoogle() {
    await this.authService.signInWithGoogle();
  }
} 