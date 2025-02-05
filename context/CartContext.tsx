"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define product type
interface Product {
    _id: string;
    Title: string;
    "Image Src": string;
    "Variant Price"?: string;
    "Variant Inventory Qty"?: string;
}

// Cart context type
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (_id: string) => void;
    updateQuantity: (_id: string, quantity: number) => void;
    clearCart: () => void;
}

// Create context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage when updated
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add product to cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item._id === product._id);
            if (existing) {
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item["Variant Inventory Qty"] || 0 + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (_id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
    };

    // Update product quantity
    const updateQuantity = (_id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item._id === _id ? { ...item, quantity } : item))
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
