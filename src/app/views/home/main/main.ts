import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Popup } from '../../../shared/components/popup/popup';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main-component',
  imports: [Popup, NgbAccordionModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  private popupObserver$: Observable<void>;
  private subscription: Subscription | null = null;

  @ViewChild(Popup)
  private popupComponent!: Popup;

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
        this.popupComponent.open()
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
