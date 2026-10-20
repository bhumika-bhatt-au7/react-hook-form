import Link from "next/link";
import { Providers } from "./providers";

const links = [
  { href: "/recipe-query", label: "Home" },
  { href: "/recipe-query/basic", label: "Basic query" },
  { href: "/recipe-query/enabled", label: "enabled" },
  { href: "/recipe-query/mutation", label: "Mutation" },
];

export default function RecipeQueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="mx-auto w-full max-w-2xl px-5 py-10">
        <nav className="mb-8 flex flex-wrap gap-4 border-b pb-3 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="underline">
              {l.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </Providers>
  );
}
