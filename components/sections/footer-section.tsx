"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  explore: [
    { label: "Spare Parts", href: "/divisions/marine-industrial" },
    { label: "RO Systems", href: "/divisions/ro-solutions" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  about: [
    { label: "Our Legacy", href: "/about" },
    { label: "Core Divisions", href: "/products" },
    { label: "Methodology", href: "/about" },
    { label: "Connect", href: "/contact" },
  ],
  service: [
    { label: "+91 99259 99945 (IN)", href: "tel:+919925999945" },
    { label: "+971 52 491 8899 (UAE)", href: "tel:+971524918899" },
    { label: "sales@deltaimpex.co", href: "mailto:sales@deltaimpex.co" },
  ],
  quick: [
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function FooterSection() {
  return (
    <footer id="contact" className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="relative mb-6 block h-24 w-36">
              <Image
                src="/logo.png"
                alt="Delta Impex Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-xs body-text">
              Your trusted partner for marine and industrial spare parts and advanced RO water treatment systems worldwide.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Head Office</p>
              <p className="mt-1">
                Office-07, Madina Tenement,
                <br />
                Jamnakund Chowk, Bhavnagar - 364001, India
              </p>
            </div>
          </div>

          <div>
            <h4 className="label-tech mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-tech mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-tech mb-4">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="label-tech !mb-0 !text-muted-foreground lowercase">
            © 2026 Delta Impex. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLinks.quick.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="label-tech !mb-0 !text-muted-foreground transition-colors hover:text-foreground lowercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
