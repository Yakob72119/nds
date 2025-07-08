import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/auth-button";
import Hero from "@/components/hero";
import Service from "@/components/services";
import AboutContactSection from "@/components/aboutusandcontactus";

export default async function Home() {
  // ✅ Check if user is already authenticated
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/protected");
  }

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
            <a href="#" className="text-blue-900 hover:text-blue-600 transition-colors">Home</a>
            <a href="#services" className="text-blue-900 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-blue-900 hover:text-blue-600 transition-colors">About Us</a>
            <a href="#contact" className="text-blue-900 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <AuthButton />
          </div>

          {/* Mobile Menu Button (placeholder for now) */}
          <button className="md:hidden text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
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
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {/* Facebook */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {/* Twitter */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {/* Instagram */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {/* LinkedIn */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
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
