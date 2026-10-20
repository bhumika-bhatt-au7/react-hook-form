"use client";

import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

type ProductsResponse = {
  products: Product[];
};

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("https://dummyjson.com/products?limit=5&delay=5000");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function BasicQueryPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Basic useQuery</h1>
      <p className="mt-1 mb-6 text-gray-500">
        Data, loading and error states come straight from the hook.
      </p>

      {isPending && (
        <p className="rounded bg-gray-100 p-3 text-gray-600">Loading ......</p>
      )}
      {isError && (
        <p className="rounded bg-red-50 p-3 text-red-700">
          Error: {error.message}
        </p>
      )}

      <div className="space-y-3">
        {data?.products.map((p) => (
          <div key={p.id} className="rounded-lg border p-4">
            <div className="flex justify-between gap-4">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="font-medium">${p.price}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
