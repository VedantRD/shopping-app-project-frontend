"use client"

import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Product {
    _id: string;
    Title: string;
    "Image Src": string;
    "Variant Price"?: string;
    "Variant Inventory Qty"?: string;
}

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item: Product) => (
                        <div key={item._id} className="flex justify-between items-center border-b py-2">
                            <div className="flex items-center space-x-4">
                                <Image src={item["Image Src"]} alt={item.Title} className="w-16 h-16 object-cover" height={100} width={100} />
                                <div>
                                    <h3>{item.Title}</h3>
                                    <p>${item["Variant Price"]}</p>
                                    <input
                                        type="number"
                                        value={item["Variant Inventory Qty"]}
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
                    <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}
