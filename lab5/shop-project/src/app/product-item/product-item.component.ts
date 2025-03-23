import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!:Product;
  @Output() remove = new EventEmitter<Product>();

  likeProduct(){
    this.product.likes++;
    this
  }

  removeProduct(){
    if(this.product.stock > 0){
      this.product.stock--;
      this.remove.emit(this.product);
    }
  
  }

}
