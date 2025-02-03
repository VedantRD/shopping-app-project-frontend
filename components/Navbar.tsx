import Link from "next/link";
import styles from "../styles/Navbar.module.scss"; // Import SCSS file

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
            </ul>
        </nav>
    );
}