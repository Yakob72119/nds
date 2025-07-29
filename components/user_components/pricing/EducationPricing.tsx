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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user_components/ui/select";
import { Label } from "@/components/ui/label";

const EducationPricing = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("9");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_name: "Standard Package",
          service_category: `Grade ${selectedGrade}`,
          amount: 1500,
        }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url; // Redirect user to Chapa checkout
      } else {
        alert("Payment initialization failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Something went wrong while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Education Curriculum
        </h2>
        <p className="text-gray-600 mt-2">
          Well-organized teaching and learning curriculum for students in
          Jigjiga City, Ethiopia
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto shadow-lg border-2 border-primary/20 hover:border-primary/50 transition-all">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-blue-700">
            Standard Package
          </CardTitle>
          <CardDescription className="text-blue-600 font-medium text-lg">
            1,500 Birr
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 pb-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="grade-select">Select Grade Level</Label>
              <Select
                value={selectedGrade}
                onValueChange={(value) => setSelectedGrade(value)}
              >
                <SelectTrigger id="grade-select" className="w-full">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-6">
              <h3 className="font-semibold text-gray-800">Package Features:</h3>
              <ul className="space-y-2">
                <li>Complete curriculum for Grade {selectedGrade}</li>
                <li>Structured lesson plans and materials</li>
                <li>Regular assessments and progress tracking</li>
                <li>Access to educational resources and materials</li>
                <li>Qualified teachers and academic support</li>
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button
            size="lg"
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Select Package"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EducationPricing;
