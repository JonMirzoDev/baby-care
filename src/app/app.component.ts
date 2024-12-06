import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
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
  `]
})
export class AppComponent {
  title = 'baby-care';
}
