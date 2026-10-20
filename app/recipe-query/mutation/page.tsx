"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductsResponse = {
  products: Product[];
};

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("https://dummyjson.com/products?limit=5&delay=1000");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const addProduct = async (input: {
  title: string;
  price: number;
}): Promise<Product> => {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function MutationPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(10);

  const list = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["products"] });
      setTitle("");
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">useMutation</h1>
      <p className="mt-1 mb-6 text-gray-500">
        Add a product. On success the mutation invalidates the products query
        and the list refetches. (dummyjson does not save writes, so the new item
        will not appear in the refetched list.)
      </p>

      <form
        className="flex flex-wrap items-end gap-3 rounded-lg border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ title, price });
        }}
      >
        <label className="flex-1 text-sm">
          Title
          <input
            className="mt-1 block w-full rounded border px-3 py-2"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="text-sm">
          Price
          <input
            type="number"
            className="mt-1 block w-24 rounded border px-3 py-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Adding..." : "Add product"}
        </button>
      </form>

      <div className="my-4 rounded bg-gray-100 p-3 text-sm">
        mutation status: <b>{mutation.status}</b>
      </div>
      {mutation.isError && (
        <p className="rounded bg-red-50 p-3 text-red-700">
          Error: {mutation.error.message}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="rounded bg-green-50 p-3 text-green-700">
          Created {mutation.data.title} (id {mutation.data.id})
        </p>
      )}

      <h2 className="mt-8 mb-1 text-lg font-semibold">Products</h2>
      <p className="mb-3 text-sm text-gray-500">
        {list.isFetching ? "Refetching list..." : "List is up to date"}
      </p>
      <ul className="divide-y rounded-lg border">
        {list.data?.products.map((p) => (
          <li key={p.id} className="flex justify-between p-3">
            <span>{p.title}</span>
            <span className="text-gray-500">${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
