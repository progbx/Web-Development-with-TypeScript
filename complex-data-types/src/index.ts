export type Product = {
    id: number;
    name: string;
    price: number;
    discount: number;
    state: ProductState;
    limitForOnePurchase: number | null;
  };

export type ProductState = "inStock" | "reservation";

export function getFormattedProductProperty(
    product: Product,
    propertyName: keyof Product,
    formatSymbol: string
): string {
    const value = product[propertyName];
    if (typeof value === "number") {
      return value.toFixed(2) + formatSymbol;
    }
    return "";
}

export function groupProductsByState(products: Product[]): Record<ProductState, Product[]> {
    return products.reduce((grouped, product) => {
      if (!grouped[product.state]) {
        grouped[product.state] = [];
      }
      grouped[product.state].push(product);
      return grouped;
    }, {} as Record<ProductState, Product[]>);
}

export type ProductCore = Omit<Product, "limitForOnePurchase" | "state" | "discount">;

export type ProductUpdate = Partial<Omit<Product, "id">>;

export type User = {
    id: number;
    name: Capitalize<string>;
    login: Lowercase<string>;
};

export function isValidUser(user: User): boolean {
    if (user.name.length === 0 || user.login.length === 0) {
      return false;
    }
  
    if (user.name[0] !== user.name[0].toUpperCase()) {
      return false;
    }
  
    if (user.login !== user.login.toLowerCase()) {
      return false;
    }
    return true;
}