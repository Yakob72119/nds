'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  email: string;
}

export function UserDropdown({ email }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button onClick={() => setOpen(!open)} className="text-sm px-4 py-2">
        {email}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold truncate">{email}</div>
          <button
            onClick={() => {
              setOpen(false);
              router.push("/dashboard");
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}

    </div>
  );
}
