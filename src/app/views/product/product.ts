import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CatalogType } from '../../types/catalog.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../shared/services/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-detail',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
  product = signal<CatalogType>({
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: '',
  });

  private subscription: Subscription | null = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRouter.params.subscribe((params) => {
      if (params['id']) {
        this.catalogService.getProduct(+params['id']).subscribe({
          next: (result) => {
            this.product.set(result);
          },
          error: (error) => {
            console.error(error);
            this.router.navigate(['/']).then();
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
