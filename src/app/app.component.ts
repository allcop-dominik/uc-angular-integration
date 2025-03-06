import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare global {
  interface Window {
    UniversalCheckoutIntegration: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'stepper-test';

  @ViewChild('checkoutIframe') checkoutIframe?: ElementRef;

  ngAfterViewInit(): void {
    // Allow time for Angular to process the DOM
    setTimeout(() => {
      this.initializeCheckoutIntegration();
    }, 500);
  }

  private initializeCheckoutIntegration(): void {
    // Get iframe element directly if ViewChild is not set up
    const iframeElement =
      this.checkoutIframe?.nativeElement ||
      document.querySelector('iframe[title="Universal Checkout Interface"]');

    if (iframeElement && window.UniversalCheckoutIntegration) {
      // Initialize the UniversalCheckoutIntegration
      window.UniversalCheckoutIntegration.init({
        debug: true,
        origin: 'https://ui.uc.dev.yk8s.allfos.net',
        iframe: {
          element: iframeElement,
          fullscreenOffsetHeight: 0,
        },
      });
      console.log('Universal Checkout Integration initialized successfully');
    } else {
      console.error(
        'Checkout iframe or UniversalCheckoutIntegration not found'
      );
    }
  }
}
