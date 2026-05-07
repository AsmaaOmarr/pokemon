import { Component, input, OnInit, output, signal } from '@angular/core';
import { NgIconComponent, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [NgIconComponent],
  providers: [
    provideIcons({ heroMagnifyingGlassSolid }),
    provideNgIconsConfig({ size: '1.2em' }),
  ],
})
export class SearchBarComponent implements OnInit {
  placeholder = input<string>('Search...');
  search = output<string>();

  ngOnInit(): void {}

  onInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.search.emit(query);
  }
}
