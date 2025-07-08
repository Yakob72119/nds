"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Send, Heart, Users, Shield } from "lucide-react";

interface AboutContactSectionProps {
  title?: string;
  aboutText?: string;
  values?: Array<{ icon: string; title: string; description: string }>;
  ctaText?: string;
  ctaButtonText?: string;
  contactTitle?: string;
  address?: string;
  email?: string;
  phone?: string;
  showMap?: boolean;
}

export default function AboutContactSection({
  title = "About Us",
  aboutText = "NDS Trading Opportunity Hub Partnership  is dedicated to transforming communities through innovative solutions in social media, education, and healthcare. Our mission is to create sustainable impact across Ethiopia, starting with Jigjiga city, by leveraging technology and human expertise.",
  values = [
    {
      icon: "heart",
      title: "Compassion",
      description: "We approach every project with genuine care and empathy.",
    },
    {
      icon: "users",
      title: "Community",
      description:
        "Building stronger, healthier, and more connected communities.",
    },
    {
      icon: "shield",
      title: "Integrity",
      description: "Maintaining the highest ethical standards in all our work.",
    },
  ],
  ctaText = "Ready to transform your vision into reality?",
  ctaButtonText = "Get in Touch",
  contactTitle = "Contact Us",
  address = "Jigjiga City, Somali Region, Ethiopia",
  email = "bietimulu19@gmail.com",
  phone = "+251 90 451 8087",
  showMap = true,
}: AboutContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="h-6 w-6 text-blue-500" />;
      case "users":
        return <Users className="h-6 w-6 text-blue-500" />;
      case "shield":
        return <Shield className="h-6 w-6 text-blue-500" />;
      default:
        return <Heart className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {title}
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          {aboutText}
        </p>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {values.map((value, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-blue-50 p-3 rounded-full mb-4">
                  {renderIcon(value.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{ctaText}</h3>
            <p className="text-blue-100">
              We're here to help you achieve your goals.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 h-auto text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {ctaButtonText}
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto" id="contact">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          {contactTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Send us a message
            </h3>
            <form
            action="https://formspree.io/f/meokwbwo"
            method="POST"
            className="space-y-6"
          >
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
              />
            </div>

            {/* Optional: Redirect to thank you page */}
            <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>

          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-8">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Address:</p>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Email:</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Phone:</p>
                    <a
                      href={`tel:${phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            {showMap && (
              <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden h-[300px] border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125309.35385602932!2d42.71959565!3d9.3438402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1631d4b57eaf29cd%3A0x3f8a7e7a76e13e1c!2sJigjiga%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jigjiga Map"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
    </div>
  );
}
