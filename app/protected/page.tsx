import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Hero from "@/components/hero";
import Service from "@/components/services";
import AboutContactSection from "@/components/aboutusandcontactus";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const userEmail = data.user.email;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
          {/* Logo */}
          <Link href={"/"}>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">
              NDS
            </div>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#herosection" className="text-blue-900 hover:text-blue-600 transition-colors">Home</a>
            <a href="#services" className="text-blue-900 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-blue-900 hover:text-blue-600 transition-colors">About Us</a>
            <a href="#contact" className="text-blue-900 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* User Dropdown (Authenticated Only) */}
          <div className="hidden md:flex items-center space-x-3">
            <UserDropdown email={userEmail || "User"} />
          </div>

          {/* Mobile Menu Placeholder */}
          <button className="md:hidden text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <Service />
      <AboutContactSection />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">NDS Trading Opportunity Hub Partnership</h3>
              <p className="text-blue-100">Transforming businesses through innovative solutions in social media, education, and healthcare.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-blue-100 hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-blue-100 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-blue-100 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Your social icons here... */}
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} NDS Trading Opportunity Hub Partnership. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
