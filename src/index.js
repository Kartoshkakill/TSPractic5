"use strict";
// ===============================
//  Крок 1: Типи товарів
// ===============================
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.addToCart = exports.filterByPrice = exports.findProduct = void 0;
// ===============================
//  Крок 2: Generic-функції
// ===============================
/**
 * Пошук товару за ID у масиві будь-яких продуктів
 */
const findProduct = (products, id) => {
    if (!Array.isArray(products))
        return undefined;
    return products.find((p) => p.id === id);
};
exports.findProduct = findProduct;
/**
 * Фільтрація товарів за максимальною ціною
 */
const filterByPrice = (products, maxPrice) => {
    if (!Array.isArray(products))
        return [];
    return products.filter((p) => p.price <= maxPrice);
};
exports.filterByPrice = filterByPrice;
/**
 * Додати товар у кошик
 */
const addToCart = (cart, product, quantity) => {
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
exports.addToCart = addToCart;
/**
 * Підрахунок загальної вартості кошика
 */
const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};
exports.calculateTotal = calculateTotal;
// ===============================
//  Крок 4: Тестові дані та демонстрація
// ===============================
// Масив електроніки
const electronics = [
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
const clothing = [
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
const phone = (0, exports.findProduct)(electronics, 1);
console.log("Знайдений товар:", phone);
const cheapItems = (0, exports.filterByPrice)([...electronics, ...clothing], 4000);
console.log("Товари дешевше 4000:", cheapItems);
let cart = [];
cart = (0, exports.addToCart)(cart, phone, 1);
cart = (0, exports.addToCart)(cart, clothing[0], 2);
console.log("Кошик:", cart);
const total = (0, exports.calculateTotal)(cart);
console.log("Загальна сума:", total);
//# sourceMappingURL=index.js.map