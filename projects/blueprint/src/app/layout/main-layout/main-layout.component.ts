import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent { }
