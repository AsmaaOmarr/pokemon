import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [MainLayoutComponent,NgxSpinnerModule]
})
export class App {
  protected readonly title = signal('pokemon');
}
