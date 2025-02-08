'use client'
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Challenges & Hackthons",
    href: "/challenges",
  },
  {
    name: "For Educational Institutions",
    href: "/institutions",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

const Nav = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white z-50 shadow-sm md:shadow-none ">
      <div className="flex items-center justify-between h-16 sm:h-20 px-4">
        <Link href="/" className="flex items-center justify-start">
          <img
            src="/umurava-logo.png"
            alt="umurava logo"
            width={250}
            height={250}
            className="h-24 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                path === link.href
                  ? "text-primary font-medium"
                  : "text-title"
              } hover:text-primary transition-colors text-sm xl:text-base`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/dashboard">
            <Button className="bg-[#0A1D56] hover:bg-primary/90">
              Join the Program
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-xl transition-transform duration-300 ease-in-out transform lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-24 px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  path === link.href
                    ? "text-primary font-medium"
                    : "text-title"
                } hover:text-primary transition-colors py-4 text-lg border-b border-gray-100`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/dashboard">
              <Button className="bg-[#0A1D56] hover:bg-primary/90 mt-8 py-6 text-lg">
                Join the Program
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;