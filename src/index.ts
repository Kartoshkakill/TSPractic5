// ===============================
//  Крок 1: Типи товарів
// ===============================

// Базовий тип товару
export type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string; // додаткове базове поле
};

// Специфічний тип — електроніка
export type Electronics = BaseProduct & {
    category: "electronics";
    brand: string;
    warrantyMonths: number;
};

// Специфічний тип — одяг
export type Clothing = BaseProduct & {
    category: "clothing";
    size: "S" | "M" | "L" | "XL";
    material: string;
};

// Можна додати книги, якщо потрібно
export type Book = BaseProduct & {
    category: "book";
    author: string;
    pages: number;
};

// ===============================
//  Крок 2: Generic-функції
// ===============================

/**
 * Пошук товару за ID у масиві будь-яких продуктів
 */
export const findProduct = <T extends BaseProduct>(
    products: T[],
    id: number
): T | undefined => {
    if (!Array.isArray(products)) return undefined;
    return products.find((p) => p.id === id);
};

/**
 * Фільтрація товарів за максимальною ціною
 */
export const filterByPrice = <T extends BaseProduct>(
    products: T[],
    maxPrice: number
): T[] => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => p.price <= maxPrice);
};

// ===============================
//  Крок 3: Кошик
// ===============================

// Елемент кошика
export type CartItem<T> = {
    product: T;
    quantity: number;
};

/**
 * Додати товар у кошик
 */
export const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T | undefined,
    quantity: number
): CartItem<T>[] => {
    if (!product) {
        console.error("Неможливо додати у кошик: продукт undefined");
        return cart;
    }

    if (quantity <= 0) {
        console.error("Кількість повинна бути більше нуля");
        return cart;
    }

    // Якщо товар вже є у кошику — збільшуємо кількість
    const existing = cart.find((item) => item.product.id === product.id);

    if (existing) {
        existing.quantity += quantity;
        return cart;
    }

    // Інакше додаємо новий елемент
    return [...cart, { product, quantity }];
};

/**
 * Підрахунок загальної вартості кошика
 */
export const calculateTotal = <T extends BaseProduct>(
    cart: CartItem<T>[]
): number => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

// ===============================
//  Крок 4: Тестові дані та демонстрація
// ===============================

// Масив електроніки
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Телефон Samsung Galaxy",
        price: 10000,
        brand: "Samsung",
        warrantyMonths: 12,
        category: "electronics",
        description: "Смартфон середнього класу"
    },
    {
        id: 2,
        name: "Ноутбук Acer",
        price: 25000,
        brand: "Acer",
        warrantyMonths: 24,
        category: "electronics",
        description: "Потужний ноутбук для роботи"
    }
];

// Масив одягу
const clothing: Clothing[] = [
    {
        id: 3,
        name: "Футболка",
        price: 500,
        size: "L",
        material: "Cotton",
        category: "clothing"
    },
    {
        id: 4,
        name: "Куртка зимова",
        price: 3500,
        size: "XL",
        material: "Polyester",
        category: "clothing"
    }
];

// Демо-робота функцій
const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);

const cheapItems = filterByPrice([...electronics, ...clothing], 4000);
console.log("Товари дешевше 4000:", cheapItems);

let cart: CartItem<BaseProduct>[] = [];
cart = addToCart(cart, phone, 1);
cart = addToCart(cart, clothing[0], 2);

console.log("Кошик:", cart);

const total = calculateTotal(cart);
console.log("Загальна сума:", total);
