import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingService } from './shared/services/loading.service';
import { ThemeService } from './shared/services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoadingComponent],
  template: `
    <main>
      <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet"></router-outlet>
      </div>
    </main>
    <app-loading *ngIf="loadingService.loading$ | async"></app-loading>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    main {
      width: 100%;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
  `],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(
    public loadingService: LoadingService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.initializeTheme();
  }
}
