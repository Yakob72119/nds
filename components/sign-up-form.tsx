"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [sponsor, setSponsor] = useState("self-sponsored");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const invitedBy = searchParams.get("invited_by");
    if (invitedBy) {
      setSponsor(invitedBy);
    }
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setError(null);
    setIsLoading(true);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone,
        options: {
          data: {
            full_name: fullName,
            sponsor,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/protected`,
        },
      });
      if (error) throw error;

      // Insert new user record into 'users' table
      const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/sign-up?invited_by=${encodeURIComponent(email)}`;

      const insertResult = await supabase.from("users").insert({
        id: data.user?.id,
        full_name: fullName,
        phone,
        sponsor,
        email,
        invites: [],
        invite_link: inviteLink,
      });

      if (insertResult.error) throw insertResult.error;

      // If sponsor is not "self-sponsored", update inviter's invites array
      if (sponsor !== "self-sponsored") {
        // Find inviter's user record by email
        const { data: inviterData, error: inviterError } = await supabase
          .from("users")
          .select("invites")
          .eq("email", sponsor)
          .single();

        if (inviterError) {
          console.warn("Inviter not found or error:", inviterError.message);
        } else {
          // Append new user id to inviter's invites array
          const updatedInvites = inviterData.invites || [];
          updatedInvites.push(data.user?.id);

          // Update inviter record with new invites array
          const { error: updateError } = await supabase
            .from("users")
            .update({ invites: updatedInvites })
            .eq("email", sponsor);

          if (updateError) {
            console.warn("Failed to update inviter invites:", updateError.message);
          }
        }
      }

      router.push("/auth/sign-up-success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+251..."
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repeat-password">Repeat Password</Label>
              <Input
                id="repeat-password"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Sponsor</Label>
              <Input
                type="text"
                value={sponsor}
                disabled
                className="bg-gray-100"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating an account..." : "Sign up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
