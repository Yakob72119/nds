"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  subPackages: string[];
}

const ServiceCard = ({
  image,
  title,
  description,
  subPackages,
}: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="h-full overflow-hidden backdrop-blur-md bg-white/30 border border-white/20 shadow-lg">
        <CardHeader className="pb-2">
          {/* Service Image */}
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <CardTitle className="text-xl font-semibold text-blue-900 text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-blue-800/80 text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* View Details Button */}
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
          >
            View Details
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {/* Sub-packages */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h4 className="font-semibold text-blue-900 text-sm">
                Sub-packages:
              </h4>
              <ul className="space-y-2">
                {subPackages.map((subPackage, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span className="text-sm text-blue-800/70">
                      {subPackage}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
      title: "Social Media",
      description: "Build your social media presence and influence",
      subPackages: [
        "Social Media Strategy Development",
        "Content Creation and Management",
        "Influencer Training Programs",
        "Brand Partnership Opportunities",
        "Analytics and Performance Tracking",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
      title: "NDS Health Service",
      description: "Comprehensive healthcare solutions for various needs",
      subPackages: [
        "Home Care Services",
        "Telehealth Consultations",
        "Pediatric Growth Follow-up",
        "Health Monitoring Devices",
        "Personal Development Training",
        "Wellness Programs",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
      title: "NDS Education System",
      description: "Quality education and skill development programs",
      subPackages: [
        "Grade 9-12 Curriculum",
        "Online Learning Platforms",
        "Skill Development Workshops",
        "Career Guidance Programs",
        "Educational Technology Training",
        "Certification Programs",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Our Services
          </h2>
          <p className="text-blue-700/70 max-w-2xl mx-auto">
            We provide innovative solutions across multiple sectors to help our
            clients achieve their goals and make a positive impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                image={service.image}
                title={service.title}
                description={service.description}
                subPackages={service.subPackages}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
