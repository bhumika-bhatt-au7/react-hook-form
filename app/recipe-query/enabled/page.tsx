"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const fetchProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}?delay=1000`);
  if (!res.ok) throw new Error(`Product ${id} not found (${res.status})`);
  return res.json();
};

export default function EnabledPage() {
  const [id, setId] = useState(1);
  const [enabled, setEnabled] = useState(false);

  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    // false = the query does not run on its own: no request, no loading.
    enabled,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">enabled</h1>
      <p className="mt-1 mb-6 text-gray-500">
        The query stays idle until enabled is true. Watch fetchStatus go from
        idle to fetching.
      </p>

      <div className="flex items-center gap-4 rounded-lg border p-4">
        <label className="text-sm">
          Product id
          <input
            type="number"
            min={1}
            max={100}
            className="ml-2 w-20 rounded border px-2 py-1"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          enabled
        </label>
      </div>

      <div className="my-4 flex gap-6 rounded bg-gray-100 p-3 text-sm">
        <span>
          status: <b>{status}</b>
        </span>
        <span>
          fetchStatus: <b>{fetchStatus}</b>
        </span>
      </div>

      {!enabled && !data && (
        <p className="text-gray-500">
          Query is disabled. Tick enabled to fetch.
        </p>
      )}
      {fetchStatus === "fetching" && (
        <p className="text-gray-600">Loading ......</p>
      )}
      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">
          Error: {error.message}
        </p>
      )}

      {data && (
        <div className="rounded-lg border p-4">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold">{data.title}</h3>
            <span className="font-medium">${data.price}</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{data.description}</p>
        </div>
      )}
    </div>
  );
}
