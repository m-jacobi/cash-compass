import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greetingMessage = "";

  greet(name: string): void {
    invoke<string>("greet", { name }).then((text: string) => {
      this.greetingMessage = text;
    });
  }
}
