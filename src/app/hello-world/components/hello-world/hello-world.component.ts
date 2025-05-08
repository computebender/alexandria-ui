import { Component, inject, signal } from '@angular/core';
import { HelloWorldService } from '../../services/hello-world.service';

@Component({
  selector: 'app-hello-world',
  imports: [],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.scss',
})
export class HelloWorldComponent {
  private helloWorldService = inject(HelloWorldService);
  readonly message = signal('');

  ngOnInit() {
    this.helloWorldService.getHelloWorldMessage().subscribe({
      next: (response) => {
        this.message.set(response.message);
        console.log(this.message());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
