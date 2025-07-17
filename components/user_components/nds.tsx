"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/user_components/ui/tabs";
import SocialMediaPricing from "./pricing/SocialMediaPricing";
import EducationPricing from "./pricing/EducationPricing";
import HealthPricing from "./pricing/HealthPricing";

export default function SocialMediaServices() {
  const [activeTab, setActiveTab] = useState("social-media");

  return (
    <div className="min-h-screen bg-white dark:bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Service Packages & Pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect package that suits your needs from our range of services
          </p>
        </div>

        <Tabs
          defaultValue="social-media"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md gap-2">
              <TabsTrigger
                value="social-media"
                className={`transition-all duration-200 ${
                  activeTab === "social-media" ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white" : ""
                }`}
              >
                Social Media
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className={`transition-all duration-200 ${
                  activeTab === "education" ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white" : ""
                }`}
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className={`transition-all duration-200 ${
                  activeTab === "health" ? "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-white" : ""
                }`}
              >
                Health
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-8">
            <TabsContent value="social-media" className="focus:outline-none">
              <SocialMediaPricing />
            </TabsContent>

            <TabsContent value="education" className="focus:outline-none">
              <EducationPricing />
            </TabsContent>

            <TabsContent value="health" className="focus:outline-none">
              <HealthPricing />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
