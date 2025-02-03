"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
export default function ProductDetail() {
    const router = useRouter();
    const { handle } = router.query;  // dynamic route using handle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [product, setProduct] = useState<any | null>(null);

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
            <Image src={product.ImageSrc} alt={product.Title} width="200" />
        </div>
    );
}
