"use client";

import {
  // Facebook,
  // Linkedin,
  Mail,
  MapPin,
  Phone,
  // Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="text-primary-foreground bg-darkprimary py-16">
      <div className="container mx-auto px-4">
        <div className="border-b border-white/15 flex gap-2 justify-between items-center h-16 pb-6">
          <Link
            href="/"
            className="rounded-full flex items-center justify-center"
          >
            <Image
              src={"/career-ticket.png"}
              width={50}
              height={50}
              alt="logo with text"
            />
          </Link>
          <div className="flex gap-4">
            <Link href={"/"} className="hover:opacity-80 transition-opacity">
              <FaFacebook
                size={24}
                className="text-darkprimary bg-white p-1 rounded-full hover:scale-110 transition-transform"
              />
            </Link>
            <Link target="_blank" href={"/"} className="hover:opacity-80 transition-opacity">
              <FaLinkedin
                size={24}
                className="text-darkprimary bg-white p-1 rounded-full hover:scale-110 transition-transform"
              />
            </Link>
            <Link target="_blank" href={"/"} className="hover:opacity-80 transition-opacity">
              <FaYoutube 
                size={24} 
                className="text-darkprimary bg-white p-1 rounded-full hover:scale-110 transition-transform" 
              />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-4">
          <div className="space-y-6">
            <p className="font-semibold text-lg">Our Address</p>
            <div className="space-y-2 text-gray-300">
              <div className="flex gap-2">
                <Mail />
                <p>career@tickets.com</p>
              </div>
              <div className="flex gap-2">
                <MapPin />
                <p>89 KG 14 Ave, Kigali</p>
              </div>
              <div className="flex gap-2">
                <Phone />
                <p>+250 700 000</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/program"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Program
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-semibold text-lg">
              Join our newsletter to keep up to date with us!
            </h3>
            <div className="flex gap-2 bg-card p-2 rounded-md">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-lg bg-card text-black border border-white/20 focus:outline-none focus:border-white/40 transition-colors"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-11 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300">
            Copyright © All Rights Reserved Umurava 2024.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
