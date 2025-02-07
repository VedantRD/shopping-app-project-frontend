"use client"

import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartProduct {
    _id: string;
    Title: string;
    "Image Src": string;
    "Variant Price"?: string;
    quantity?: number;
}

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item["Variant Price"] || "0");
            return total + price * (item.quantity || 1);
        }, 0).toFixed(2);
    };


    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 flex flex-row justify-between">
                <span>Shopping Cart</span>
            </h1>
            {/* <h3 className="text-xl">Total - $0</h3> */}
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item: CartProduct) => (
                        <div key={item._id} className="flex justify-between items-center border-b py-2">
                            <div className="flex items-center space-x-4">
                                <Image src={item["Image Src"]} alt={item.Title} className="w-16 h-16 object-cover" height={100} width={100} />
                                <div>
                                    <h3>{item.Title}</h3>
                                    <p className="py-1">${item["Variant Price"]}</p>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min={1}
                                        onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                        className="border px-2 py-1 w-16"
                                    />
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-red-500">
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="py-4 font-bold text-lg text-gray-900">
                        Total: ${calculateTotal()}
                    </div>
                    <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}
