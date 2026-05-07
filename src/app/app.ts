import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [MainLayoutComponent]
})
export class App {
  protected readonly title = signal('pokemon');
}
