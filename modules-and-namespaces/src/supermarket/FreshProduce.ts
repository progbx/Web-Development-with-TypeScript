export namespace FreshProduce {
    export class Product {
      name: string;
      price: number;
      weight: number;
      expirationDate: Date;
  
      constructor(name: string, price: number, weight: number, expirationDate: Date) {
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.expirationDate = expirationDate;
      }
    }
}