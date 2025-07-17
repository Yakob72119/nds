import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface HealthPackage {
  title: string;
  description: string;
  features: string[];
  amount: number;
}

const HealthPricing = () => {
  const [packages, setPackages] = useState<HealthPackage[]>([
    {
      title: "Home Care",
      description:
        "Follow the Pediatrics from birth to lifelong for health issues and giving sustainable training for personal development.",
      features: [
        "24/7 home visits",
        "Personalized care plans",
        "Regular health assessments",
        "Family training sessions",
      ],
      amount: 0,
    },
    {
      title: "Telehealth",
      description:
        "Providing standard health care services without coming in to health centre or hospitals by using remote control patient monitoring devices.",
      features: [
        "Virtual consultations",
        "Remote monitoring devices",
        "Digital health records",
        "Emergency response system",
      ],
      amount: 0,
    },
    {
      title: "Pediatric Growth Follow Up",
      description:
        "Follow the Pediatrics from birth to lifelong for health issues and giving sustainable training for personal development.",
      features: [
        "Growth milestone tracking",
        "Nutritional guidance",
        "Developmental assessments",
        "Parental education sessions",
      ],
      amount: 0,
    },
  ]);

  const handleAmountChange = (index: number, value: string) => {
    const newPackages = [...packages];
    newPackages[index].amount = Number(value) || 0;
    setPackages(newPackages);
  };

  const handleSubscribe = (packageTitle: string, amount: number) => {
    // This would handle the subscription process
    console.log(
      `Subscribing to ${packageTitle} package with amount: ${amount} birr`,
    );
    // In a real application, this would navigate to checkout or process the payment
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Health Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Customize your health package by entering your preferred amount below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <Card
            key={index}
            className="flex flex-col h-full border-2 hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
              <CardDescription className="text-sm mt-2">
                {pkg.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Label
                  htmlFor={`amount-${index}`}
                  className="block text-sm font-medium mb-1"
                >
                  Enter your amount (birr):
                </Label>
                <div className="flex items-center">
                  <Input
                    id={`amount-${index}`}
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    value={pkg.amount || ""}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(pkg.title, pkg.amount)}
                disabled={pkg.amount <= 0}
              >
                {pkg.amount > 0
                  ? `Subscribe for ${pkg.amount} birr`
                  : "Enter an amount"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthPricing;
