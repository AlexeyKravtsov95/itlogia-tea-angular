import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CatalogType } from '../../../types/catalog.type';
import { CatalogService } from '../../../shared/services/products';
import { Router } from '@angular/router';
import { CatalogCard } from '../../../shared/components/common/catalog-card/catalog-card';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [CatalogCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  catalog: WritableSignal<CatalogType[]> = signal<CatalogType[]>([]);
  loading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private router: Router,
    private catalogService: CatalogService,
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.subscription = this.catalogService.getCatalog()
      .pipe(
        tap(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
      next: (data: CatalogType[]) => {
        this.catalog.set(data);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/']).then();
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
