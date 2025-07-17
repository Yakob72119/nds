"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import Link from "next/link"
import { AuthButton } from "@/components/auth-button"

export function ResponsiveNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">
            NDS
          </div>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-blue-900 hover:text-blue-600 transition-colors">Home</a>
          <a href="#services" className="text-blue-900 hover:text-blue-600 transition-colors">Services</a>
          <a href="#about" className="text-blue-900 hover:text-blue-600 transition-colors">About Us</a>
          <a href="#contact" className="text-blue-900 hover:text-blue-600 transition-colors">Contact</a>
        </div>

        {/* Auth (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <AuthButton />
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenu.Trigger asChild>
              <button className="text-blue-900" aria-label="Toggle Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="bg-white rounded-lg shadow-lg p-4 w-48 border border-blue-100 space-y-2 z-[999]"
            >
              <DropdownMenu.Item asChild>
                <a href="#" className="block px-2 py-1 rounded-md hover:bg-blue-100 text-blue-900">Home</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <a href="#services" className="block px-2 py-1 rounded-md hover:bg-blue-100 text-blue-900">Services</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <a href="#about" className="block px-2 py-1 rounded-md hover:bg-blue-100 text-blue-900">About Us</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <a href="#contact" className="block px-2 py-1 rounded-md hover:bg-blue-100 text-blue-900">Contact</a>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="my-2 border-t border-blue-200" />

              <DropdownMenu.Item asChild>
                <div className="px-2">
                  <AuthButton />
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  )
}
