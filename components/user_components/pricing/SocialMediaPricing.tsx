"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const SocialMediaPricing: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const packages = [
    {
      name: "Silver",
      price: 2500,
      description: "Basic social media training and platform setup",
      features: [
        "Social media account setup",
        "Basic content strategy",
        "Weekly posting schedule",
        "Monthly performance report",
        "Email support",
      ],
      color: "bg-gray-200",
    },
    {
      name: "Platinum",
      price: 5000,
      description: "Advanced social media training and monetization",
      features: [
        "All Silver features",
        "Advanced content strategy",
        "Daily posting schedule",
        "Audience growth tactics",
        "Monetization strategy",
        "Weekly performance reports",
        "Priority email & chat support",
      ],
      color: "bg-gray-300",
      popular: true,
    },
    {
      name: "Diamond",
      price: 10000,
      description: "Premium social media training and full monetization",
      features: [
        "All Platinum features",
        "Premium content creation",
        "Multiple platform management",
        "Influencer networking",
        "Advanced monetization strategies",
        "Brand partnership opportunities",
        "Dedicated account manager",
        "24/7 priority support",
      ],
      color: "bg-blue-100",
    },
  ];

  const handlePayment = async (pkgName: string, price: number) => {
    setLoading(pkgName);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_name: pkgName,
          service_category: "Social Media Services",
          amount: price,
        }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url; // Redirect to Chapa
      } else {
        alert("Failed to start payment. Please try again.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("An error occurred while starting payment.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Social Media Packages
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional social media training and monetization strategies to
            grow your online presence
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`flex flex-col h-full border-2 ${
                pkg.popular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              <CardHeader className={`${pkg.color} rounded-t-lg`}>
                {pkg.popular && (
                  <div className="py-1 px-4 bg-primary text-primary-foreground text-xs font-medium rounded-full w-fit mx-auto mb-2">
                    Most Popular
                  </div>
                )}
                <CardTitle className="text-2xl font-bold text-center">
                  {pkg.name}
                </CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-lg ml-1">birr</span>
                </div>
                <CardDescription className="text-center">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow pt-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => handlePayment(pkg.name, pkg.price)}
                  disabled={loading === pkg.name}
                >
                  {loading === pkg.name
                    ? "Processing..."
                    : `Select ${pkg.name} Package`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPricing;
