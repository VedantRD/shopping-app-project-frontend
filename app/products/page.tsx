"use client";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import styles from '../../styles/ProductCard.module.scss';

const altImageSrc = "http://cdn.shopify.com/s/files/1/0028/4062/products/600_DB216_Black_Blue_Fingerless_GlovesPS.jpg?1257429506";

interface Product {
    _id: string;
    Title: string;
    "Image Src": string;
    "Variant Price"?: string;
    "Variant Inventory Qty"?: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [error, setError] = useState(false);
    return (
        <li key={product._id} className={styles.card}>
            <div>
                <Image
                    src={product["Image Src"] || altImageSrc}
                    alt={''} height={500}
                    width={500}
                    className={`p-2 object-center ${styles.image}`}
                    onError={(e) => {
                        if (!error) {
                            (e.currentTarget as HTMLImageElement).src = altImageSrc;
                            setError(true);
                        }
                    }}
                />
                <div className="flex flex-col p-2">
                    <h3 className="line-clamp-1">{product.Title || 'Product Title'}</h3>
                    <p>Price: ${product["Variant Price"] || 'Product Price'}</p>
                    <p>Stock: {product["Variant Inventory Qty"] || 'Product Stock'}</p>
                    <div className="flex flex-shrink justify-end w-full h-full">
                        <button className="bg-rose-600 text-gray-100 py-2 px-4 rounded w-1/2">
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default function ProductsPage() {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const newProducts = originalProducts.filter(item => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));
        setProducts(newProducts);
    }, [searchQuery, originalProducts]);

    const API_URL = process.env.API_URL

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then((res) => {
                setProducts(res.data.products);
                setOriginalProducts(res.data.products);
            });
    }, []);

    return (
        <div className='h-full'>
            <div className='max-w-md mx-auto my-2'>
                <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search something.." />
                </div>
            </div>
            <ul className="flex flex-row flex-wrap">
                {products.map((product) => (
                    product["Image Src"] && <ProductCard product={product} key={product._id} />
                ))}
            </ul>
        </div>
    );
}
