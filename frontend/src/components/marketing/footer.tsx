import Link from "next/link";
import { Logo } from "@/components/marketing/logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "AI Chat", href: "/chat" },
      { label: "Changelog", href: "/build" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Security", href: "/#security" },
      { label: "Contact sales", href: "/contact/sales" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/#" },
      { label: "API", href: "/#" },
      { label: "Status", href: "/#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/#" },
      { label: "Terms", href: "/#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline px-8 py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Logo size={20} />
              <span className="text-body-sm text-ink">PlusEmail</span>
            </div>
            <p className="text-caption text-ink-subtle mt-3 max-w-[180px]">
              Your inbox, understood.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-caption text-ink-tertiary uppercase tracking-wide mb-3">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-caption text-ink-subtle hover:text-ink transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-hairline text-caption text-ink-tertiary">
          © {new Date().getFullYear()} PlusEmail. Not affiliated with Google.
        </div>
      </div>
    </footer>
  );
}
