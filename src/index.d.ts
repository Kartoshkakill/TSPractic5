export type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
};
export type Electronics = BaseProduct & {
    category: "electronics";
    brand: string;
    warrantyMonths: number;
};
export type Clothing = BaseProduct & {
    category: "clothing";
    size: "S" | "M" | "L" | "XL";
    material: string;
};
export type Book = BaseProduct & {
    category: "book";
    author: string;
    pages: number;
};
/**
 * Пошук товару за ID у масиві будь-яких продуктів
 */
export declare const findProduct: <T extends BaseProduct>(products: T[], id: number) => T | undefined;
/**
 * Фільтрація товарів за максимальною ціною
 */
export declare const filterByPrice: <T extends BaseProduct>(products: T[], maxPrice: number) => T[];
export type CartItem<T> = {
    product: T;
    quantity: number;
};
/**
 * Додати товар у кошик
 */
export declare const addToCart: <T extends BaseProduct>(cart: CartItem<T>[], product: T | undefined, quantity: number) => CartItem<T>[];
/**
 * Підрахунок загальної вартості кошика
 */
export declare const calculateTotal: <T extends BaseProduct>(cart: CartItem<T>[]) => number;
//# sourceMappingURL=index.d.ts.map