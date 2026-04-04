import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'main-component',
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  private popupObserver$: Observable<void>;
  private subscription: Subscription | null = null;
  isOpenPopup: WritableSignal<boolean> = signal(false);

  constructor() {
    this.popupObserver$ = new Observable((observer) => {
      const timeout = setTimeout(() => {
        observer.next();
        observer.complete();
      }, 10000);
      return () => {
        clearTimeout(timeout);
      };
    });
  }

  ngOnInit() {
    this.subscription = this.popupObserver$.subscribe({
      next: () => {
        this.isOpenPopup.set(true);
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closePopup() {
    this.isOpenPopup.set(false);
  }
}
