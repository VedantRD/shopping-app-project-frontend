"use client"

import Link from "next/link";
import styles from "../styles/Navbar.module.scss"; // Import SCSS file
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cart } = useCart();
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><Link href="/products">Home</Link></li>
                {/* <li><Link href="/products">Products</Link></li> */}
                <li><Link href="/cart">Cart ({cart.length})</Link></li>
            </ul>
        </nav>
    );
}