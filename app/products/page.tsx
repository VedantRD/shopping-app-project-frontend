"use client";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
// import styles from '../../styles/ProductCard.module.scss';
import Loader from "@/components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

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
    deleteProduct: (productId: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ProductCard = ({ product, deleteProduct }: ProductCardProps) => {
    const [error, setError] = useState(false);
    const { addToCart } = useCart();

    return (
        <li key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-200 w-64 h-96 m-4 flex flex-col justify-between">
            <div className="p-4 flex flex-col items-center flex-grow">
                <Image
                    src={product["Image Src"] || altImageSrc}
                    alt={product.Title || "Product Image"}
                    height={250}
                    width={250}
                    className="object-cover rounded-md w-full h-40"
                    onError={(e) => {
                        if (!error) {
                            (e.currentTarget as HTMLImageElement).src = altImageSrc;
                            setError(true);
                        }
                    }}
                />
                <div className="w-full text-center mt-5">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-12 overflow-hidden">{truncateText(product.Title || "Product Title", 40)}</h3>
                    {/* <p className="text-gray-900 font-bold text-sm mt-2">Price: <span className="text-green-600">${product["Variant Price"] || "N/A"}</span></p> */}
                    {/* <p className="text-gray-900 font-semibold text-sm">Stock: <span className="text-gray-700">{product["Variant Inventory Qty"] || "N/A"}</span></p> */}
                </div>
            </div>

            <div className="w-full flex justify-between px-4 py-2">
                <h3 className="text-green-600 font-bold">${product["Variant Price"] || "N/A"}</h3>
                <p><span className="text-gray-700">Qty: {product["Variant Inventory Qty"] || "N/A"}</span></p>
            </div>
            <div className="w-full flex justify-between p-4">
                <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-3/4"
                >
                    Add to Cart
                    <FontAwesomeIcon icon={faCartShopping} className="text-white ml-3" />
                </button>
                <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 ml-3 rounded bg-rose-500 hover:bg-gray-200 transition w-1/4"
                >
                    <FontAwesomeIcon icon={faTrash} className="text-white hover:text-rose-700" />
                </button>
            </div>
        </li>
    );
};


export default function ProductsPage() {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Loader state

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const newProducts = originalProducts.filter(item => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));
        setProducts(newProducts);
    }, [searchQuery, originalProducts]);

    const API_URL = process.env.API_URL

    const getallProducts = () => {
        setLoading(true);
        axios.get(`${API_URL}/products`)
            .then((res) => {
                setProducts(res.data.products);
                setOriginalProducts(res.data.products);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    const deleteProduct = (productId: string) => {
        setLoading(true)
        axios.delete(`${API_URL}/products`, {
            data: { productId }
        })
            .then(res => {
                console.log(res.data);
                const newProducts = products.filter(product => productId !== product._id);
                setProducts(newProducts);
                setOriginalProducts(newProducts);
                setLoading(false);
            })
            .catch(err => console.log(err));

    };

    useEffect(() => {
        getallProducts();
    }, []);

    return loading ?
        <Loader />
        :
        (
            <div className='h-full'>
                <div className='max-w-md mx-auto my-2 mt-4'>
                    <div className="relative flex items-center w-full h-12 rounded-lg shadow-md bg-white overflow-hidden border border-gray-200">
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
                <ul className="flex flex-row flex-wrap justify-center">
                    {products.map((product) => (
                        product["Image Src"] && <ProductCard product={product} key={product._id} deleteProduct={deleteProduct} />
                    ))}
                </ul>
            </div>
        );
}
