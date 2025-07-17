import React from "react";
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

interface EducationPricingProps {
  onSelectPackage?: (grade: string) => void;
}

const EducationPricing = ({
  onSelectPackage = () => {},
}: EducationPricingProps) => {
  const [selectedGrade, setSelectedGrade] = React.useState<string>("9");

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
  };

  const handleSelectPackage = () => {
    onSelectPackage(selectedGrade);
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
              <Select value={selectedGrade} onValueChange={handleGradeChange}>
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
                <li className="flex items-start">
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
                  <span>Complete curriculum for Grade {selectedGrade}</span>
                </li>
                <li className="flex items-start">
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
                  <span>Structured lesson plans and materials</span>
                </li>
                <li className="flex items-start">
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
                  <span>Regular assessments and progress tracking</span>
                </li>
                <li className="flex items-start">
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
                  <span>Access to educational resources and materials</span>
                </li>
                <li className="flex items-start">
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
                  <span>Qualified teachers and academic support</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button
            size="lg"
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={handleSelectPackage}
          >
            Select Package
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EducationPricing;
