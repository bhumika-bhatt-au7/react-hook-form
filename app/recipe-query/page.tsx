import Link from "next/link";

const examples = [
  ["basic", "useQuery: data, loading and error with no useEffect/useState"],
  ["enabled", "enabled: run a query only when you decide"],
  ["mutation", "useMutation: POST, then invalidate and refetch"],
];

export default function RecipeQueryHome() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">React Query examples</h1>
      <p className="mb-6 text-gray-500">
        One concept per page. Compare with the plain fetch version at{" "}
        <Link href="/recipe" className="underline">
          /recipe
        </Link>
        .
      </p>
      <ul className="space-y-3">
        {examples.map(([slug, text]) => (
          <li key={slug}>
            <Link
              href={`/recipe-query/${slug}`}
              className="font-semibold underline"
            >
              {slug}
            </Link>
            <span className="text-gray-500"> – {text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
