import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../shared/services/products';
import { catchError, map, of, Subscription, tap, throwError } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  private productName: string = '';
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  showForm: WritableSignal<boolean> = signal(true);
  formError: WritableSignal<boolean> = signal(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private formBuilder: FormBuilder,
  ) {
    this.orderForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      product: [`${this.productName}`],
      address: ['', [Validators.required, Validators.pattern(/^[a-zа-я\d\s-/]+$/i)]],
      comment: [''],
    });
  }

  get name() {
    return this.orderForm.get('name');
  }

  get lastName() {
    return this.orderForm.get('last_name');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get comment() {
    return this.orderForm.get('comment');
  }

  get product() {
    return this.orderForm.get('product');
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.productName = params['product'];
        this.orderForm.patchValue({ product: params['product'] });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder(): void {
    if (this.orderForm.valid) {
      this.formError.set(false);

      this.subscriptionOrder = this.catalogService
        .createOrder({
          name: this.name?.value,
          last_name: this.lastName?.value,
          phone: this.phone?.value,
          country: this.country?.value,
          zip: this.zip?.value,
          product: this.product?.value,
          address: this.address?.value,
          comment: this.comment?.value,
        })
        .pipe(
          map((response) => response.success),
          tap((success) => {
            if (success === 1) {
              this.showForm.set(false);
              this.formError.set(false);
            } else {
              this.formError.set(true);
              setTimeout(() => {
                this.formError.set(false);
              }, 3000);
            }
          }),
          catchError((error) => {
            console.error('Error:', error);
            this.formError.set(true);
            setTimeout(() => {
              this.formError.set(false);
            }, 3000);
            return of(error);
          }),
        )
        .subscribe();
    } else {
      Object.keys(this.orderForm.controls).forEach((key) => {
        const control = this.orderForm.controls[key];
        control?.markAsTouched();
      });
      this.formError.set(true);
      setTimeout(() => {
        this.formError.set(false);
      }, 3000);
    }
  }
}
