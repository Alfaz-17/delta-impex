"use client";

import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "Spare Parts", href: "#parts" },
    { label: "RO Systems", href: "#ro-systems" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ],
  about: [
    { label: "Our Vision", href: "#vision" },
    { label: "Core Divisions", href: "#parts" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  service: [
    { label: "India: +91 9925999945", href: "tel:+919925999945" },
    { label: "UAE: +971 524918899", href: "tel:+971524918899" },
    { label: "Email: info@deltaimpex.com", href: "mailto:info@deltaimpex.com" },
    { label: "Support", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer id="contact" className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="heading-sub !text-xl !mb-0 text-foreground">
              Delta Impex
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your Trusted Partner for Marine & Industrial Spare Parts and Advanced RO Water Treatment Systems worldwide.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Head Office</p>
              <p className="mt-1">
                Office-07, Madina Tenement,
                <br />
                Jamnakund Chowk, Bhavnagar – 364001, India
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="label-tech mb-4 !text-foreground !font-bold">Explore</h4>
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

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">About</h4>
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

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Contact</h4>
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

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Delta Impex. All rights reserved.
          </p>

          

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
