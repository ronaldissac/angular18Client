import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_NAME } from './shared/constants';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = APP_NAME;
}
