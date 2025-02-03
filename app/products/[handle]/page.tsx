"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Product {
    Title: string;
    Body: string;
    VariantPrice: string;
    VariantInventoryQty: string;
    ImageSrc: string;
}

export default function ProductDetail() {
    const router = useRouter();
    const { handle } = router.query;  // dynamic route using handle
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (handle) {
            axios.get(`http://localhost:5000/api/products/${handle}`).then((res) => setProduct(res.data));
        }
    }, [handle]);

    if (!product) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>{product.Title}</h1>
            <p>{product.Body}</p>
            <p>Price: ${product.VariantPrice}</p>
            <p>Stock: {product.VariantInventoryQty}</p>
            <Image src={product.ImageSrc} alt={product.Title} width={200} height={200} />
        </div>
    );
}
