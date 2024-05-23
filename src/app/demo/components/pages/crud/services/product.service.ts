
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPath);
  }

  getProduct(): Observable<Product[]> {
    return this.productRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    );
  }

  addProduct(product: Product): void {
    this.productRef.push(product);
  }

  deleteProduct(key: string): void {
    this.productRef.remove(key);
  }

  updateProduct(key: string, value: any): void{
    this.productRef.update(key, value).catch(error => this.handleError(error))
  }

  private handleError(error){
    console.log(error);
  }
}
