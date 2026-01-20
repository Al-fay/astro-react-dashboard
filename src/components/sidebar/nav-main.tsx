"use client";

import { useState } from "react";
import { Home, Book, Settings, ChevronDown } from "lucide-react";

const items = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Documentation",
    icon: Book,
    children: [
      {
        title: "Getting Started",
        href: "/docs/getting-started",
      },
      {
        title: "API Reference",
        href: "/docs/api",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function NavMain() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="py-2 space-y-1">
      {items.map((item) => {
        const hasChildren = !!item.children;
        const isOpen = open === item.title;

        return (
          <div key={item.title}>
            {/* Parent Item */}
            {hasChildren ? (
              <button
                onClick={() => setOpen(isOpen ? null : item.title)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <a
                href={item.href}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </a>
            )}

            {/* Dropdown */}
            {hasChildren && isOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <a
                    key={child.title}
                    href={child.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {child.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
