import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private readonly TOKEN_KEY = 'auth_token';

  private authState = new BehaviorSubject<AuthState>({
    user: null,
    accessToken: localStorage.getItem(this.TOKEN_KEY),
    loading: false,
    error: null,
  });

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          storage: localStorage,
        },
      }
    );
    this.initializeAuth();
  }

  // Public observables for components to subscribe to
  user$ = this.authState.pipe(map((state) => state.user));
  isAuthenticated$ = this.authState.pipe(map((state) => !!state.user));
  loading$ = this.authState.pipe(map((state) => state.loading));
  error$ = this.authState.pipe(map((state) => state.error));

  private async initializeAuth() {
    try {
      // Get initial session
      const {
        data: { session },
        error: sessionError,
      } = await this.supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        this.handleAuthSuccess(session);
      }

      // Listen for auth changes
      this.supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          this.handleAuthSuccess(session);
        } else if (event === 'SIGNED_OUT') {
          this.handleSignOut();
        }
      });
    } catch (error: any) {
      console.error('Auth initialization error:', error);
      this.handleAuthError(error);
    }
  }

  async signInWithGoogle() {
    this.setLoading(true);
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      this.handleSignOut();
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  private handleAuthSuccess(session: any) {
    const user: User = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.full_name || session.user.email,
      avatar_url: session.user.user_metadata?.avatar_url,
    };

    localStorage.setItem(this.TOKEN_KEY, session.access_token);
    this.authState.next({
      user,
      accessToken: session.access_token,
      loading: false,
      error: null,
    });
    this.router.navigate(['/dashboard']);
  }

  private handleSignOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authState.next({
      user: null,
      accessToken: null,
      loading: false,
      error: null,
    });
    this.router.navigate(['/auth/login']);
  }

  private handleAuthError(error: any) {
    console.error('Auth error:', error);
    this.authState.next({
      ...this.authState.value,
      loading: false,
      error: error.message || 'Authentication failed',
    });
  }

  private setLoading(loading: boolean) {
    this.authState.next({
      ...this.authState.value,
      loading,
      error: null,
    });
  }

  getAuthToken(): string | null {
    return this.authState.value.accessToken;
  }
}
