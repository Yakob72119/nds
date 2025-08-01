import { Suspense } from "react";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Loading form...</div>}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
