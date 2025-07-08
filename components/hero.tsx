'use client'

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface HeroSectionProps {
  title?: string;
  vision?: string;
  mission?: string;
  motto?: string;
}

export default function HeroSection({
  title = "NDS Trading Opportunity Hub Partnership",
  vision = "Create talented, energetic, visionary and well-organised social media and financial influencers in Ethiopia.",
  mission = "Giving sustainable, renewable and versatile opportunities to everyone.",
  motto = "NDS has extra opportunities",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[700px] w-full overflow-hidden bg-gradient-to-br from-blue-50 to-white px-4 py-20 md:px-8 lg:px-16">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Announcement Banner */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.25v1.25m0-1.25a6.75 6.75 0 1 0-6.75-6.75M12 18.25a6.75 6.75 0 0 0 6.75-6.75M12 3.75v1.25m0 0a6.75 6.75 0 0 1 6.75 6.75m-6.75-6.75A6.75 6.75 0 0 0 5.25 11.75"
              />
            </svg>
            <span className="text-white font-semibold text-base md:text-lg tracking-wide">
              Join Our Community to Get Upskilled
            </span>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column - Main content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Agency name */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-blue-900 md:text-5xl lg:text-6xl leading-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 italic">ኤን ዲ ኤስ የንግድ እድል ማዕከል አጋርነት</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/get-started">
                <span className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition text-lg">
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* Right column - Service cards */}
          <div className="grid grid-cols-1 gap-4">
            {/* Social Media Service Card */}
            <Card
              className="overflow-hidden backdrop-blur-lg"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "12px",
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Social Media Service
                </h3>
                <p className="text-gray-600 text-sm">
                  Giving applicable social media training and forming monitazied social media platforms.
                </p>
              </CardContent>
            </Card>

            {/* Education Service Card */}
            <Card
              className="overflow-hidden backdrop-blur-lg"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "12px",
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Education Service
                </h3>
                <p className="text-gray-600 text-sm">
                Providing a well organized teaching learning curriculum for grade 9, 10, 11 and 12 in jigjiga city Ethiopia.
				</p>
              </CardContent>
            </Card>

            {/* Health Service Card */}
            <Card
              className="overflow-hidden backdrop-blur-lg"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "12px",
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Health Service
                </h3>
                <p className="text-gray-600 text-sm">
                  Providing health education and awareness programs to promote well-being in the community.
				</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom motto section */}
        <div className="mt-16 text-center">
          <Card
            className="inline-block overflow-hidden backdrop-blur-lg px-8 py-4"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "12px",
            }}
          >
            <p className="text-xl font-semibold text-blue-800">{motto}</p>
          </Card>
        </div>

        {/* Vision and Mission - moved to bottom */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card
            className="overflow-hidden backdrop-blur-lg"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "12px",
            }}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700">{vision}</p>
            </CardContent>
          </Card>

          <Card
            className="overflow-hidden backdrop-blur-lg"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "12px",
            }}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700">{mission}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
