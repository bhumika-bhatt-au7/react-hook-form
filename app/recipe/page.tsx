"use client"
import React, { useEffect, useState } from "react";

type ProductType = {
    "id": number,
    "title": string,
    "description": string,
    "category": string,
    "price": number,
}

type ApiResponse = {
    "total": number,
    "skip": number,
    "limit": number,
    products: ProductType[]
}

export default function RecipeApp() {
    const [search, setSearch] = useState<string>("");

    const [products, setProducts] = useState<ApiResponse|null>(null);

    const testApi = async () => {
        const data = await fetch('https://dummyjson.com/products?delay=2000')
        const items = await data.json();
        setProducts(items);
    }

    const searchAPI = async () => {
        const data = await fetch(`https://dummyjson.com/products/search?q=${search}`)
        const items = await data.json();
        setProducts(items);
    }


    useEffect(() => {
        testApi()
    }, [])

    useEffect(()=>{
        searchAPI()
    },[search])

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "600px",
                margin: "40px auto",
                padding: "0 20px",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: "20px",
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}
            >
                {!products && <h1>Loading ......</h1>}

                {products && products.products.length > 0 && 
                    products.products.map((card) => (
                        <div
                            key={card.title}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "16px",
                                padding: "20px",
                                background: "#ffffff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                            }}
                        >

                            <div style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        margin: "0 0 6px",
                                        fontSize: "17px",
                                        color: "#111827",
                                    }}
                                >
                                    {card.title}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        lineHeight: 1.5,
                                        color: "#6b7280",
                                    }}
                                >
                                    {card.description}
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        lineHeight: 1.5,
                                        color: "#6b7280",
                                    }}
                                >
                                    {card.price}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}