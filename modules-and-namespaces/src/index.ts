import { FreshProduce } from './supermarket/FreshProduce';
import { BakedGoods } from './supermarket/BakedGoods';
import { DairyProducts } from './supermarket/DairyProducts';
import { CannedGoods } from './supermarket/CannedGoods';
import { PersonalCare } from './supermarket/PersonalCare';

const apple = new FreshProduce.Product("Apple", 0.5, 100, new Date("2021-12-30"));
const bread = new BakedGoods.Product("Bread", 1, 500, new Date("2021-12-31"));
const milk = new DairyProducts.Product("Milk", 2, 1000, new Date("2022-01-10"));
const tuna = new CannedGoods.Product("Tuna", 3, 200, new Date("2023-12-30"));
const soap = new PersonalCare.Product("Soap", 1, 50, new Date("2024-12-30"));

export class Goods {
  static displayProducts(product: FreshProduce.Product | BakedGoods.Product | DairyProducts.Product | CannedGoods.Product | PersonalCare.Product): void {
    const day = product.expirationDate.getDate().toString().padStart(2, '0');
    const month = (product.expirationDate.getMonth() + 1).toString().padStart(2, '0');
    const year = product.expirationDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    console.log(`Product ${product.name}, has price: ${product.price}, weight: ${product.weight}, expiration date: ${formattedDate}`);
  }
}

Goods.displayProducts(apple);
Goods.displayProducts(bread);
Goods.displayProducts(milk);
Goods.displayProducts(tuna);
Goods.displayProducts(soap);