import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  
  private authState = new BehaviorSubject<AuthState>({
    user: null,
    accessToken: localStorage.getItem(this.TOKEN_KEY),
    loading: false,
    error: null
  });

  constructor(private router: Router) {
    this.initializeAuth();
  }

  // Public observables for components to subscribe to
  user$ = this.authState.pipe(map(state => state.user));
  isAuthenticated$ = this.authState.pipe(map(state => !!state.user));
  loading$ = this.authState.pipe(map(state => state.loading));
  error$ = this.authState.pipe(map(state => state.error));

  private initializeAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.validateAndRefreshToken();
    }
  }

  login(email: string, password: string): Observable<User> {
    this.setLoading(true);
    
    // TODO: Replace with actual API call
    return of({ id: '1', email, name: 'Test User' }).pipe(
      tap(user => {
        const fakeToken = 'fake_token_' + Date.now();
        this.handleAuthSuccess(user, fakeToken);
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => error);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    this.setLoading(true);
    
    // TODO: Replace with actual API call
    return of({ id: '1', email, name }).pipe(
      tap(user => {
        const fakeToken = 'fake_token_' + Date.now();
        this.handleAuthSuccess(user, fakeToken);
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.authState.next({
      user: null,
      accessToken: null,
      loading: false,
      error: null
    });
    this.router.navigate(['/auth/login']);
  }

  private handleAuthSuccess(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.authState.next({
      user,
      accessToken: token,
      loading: false,
      error: null
    });
    this.router.navigate(['/dashboard']);
  }

  private handleAuthError(error: any): void {
    this.authState.next({
      ...this.authState.value,
      loading: false,
      error: error.message || 'Authentication failed'
    });
  }

  private setLoading(loading: boolean): void {
    this.authState.next({
      ...this.authState.value,
      loading,
      error: null
    });
  }

  private validateAndRefreshToken(): void {
    // TODO: Implement token validation and refresh logic
    // This should verify the current token and refresh if needed
  }

  getAuthToken(): string | null {
    return this.authState.value.accessToken;
  }
} 