// Signup.tsx
// React 19 + TypeScript + Tailwind CSS + ShadCN UI
// No external form libraries – manual state & validation

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  employees: string; // keep as string for controlled input
}

type SignUpErrors = Partial<Record<keyof SignUpFormData, string>>;

const initialData: SignUpFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  employees: "",
};

const Signup: React.FC = () => {
  const [data, setData] = useState<SignUpFormData>(initialData);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ---------- Handlers ----------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof SignUpFormData
  ) => {
    setData({ ...data, [field]: e.target.value });
    // Clear field‑specific error on change
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const validate = (): boolean => {
    const newErrors: SignUpErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/i.test(data.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/i.test(data.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!data.company.trim()) newErrors.company = "Company name is required";

    if (!data.employees.trim()) {
      newErrors.employees = "Employees count is required";
    } else {
      const num = Number(data.employees);
      if (Number.isNaN(num) || num <= 0) newErrors.employees = "Enter a positive number";
      if (num > 100000) newErrors.employees = "That seems too high";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await axiosInstance.post("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          employees: Number(data.employees),
        }),
      });

      if (!res.ok) throw new Error("Failed to create account. Please try again.");

      setIsSuccess(true);
      setData(initialData);
    } catch (err) {
      if (err instanceof Error) setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-foreground">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuccess && (
            <p className="rounded-lg bg-green-500/20 p-3 text-center text-sm text-green-600">
              Account created successfully!
            </p>
          )}
          {apiError && (
            <p className="rounded-lg bg-red-500/20 p-3 text-center text-sm text-red-600">
              {apiError}
            </p>
          )}

          <form onSubmit={onSubmit} className="grid gap-4">
            {/* First Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={data.firstName}
                onChange={(e) => handleChange(e, "firstName")}
              />
              {errors.firstName && <span className="text-sm text-red-500">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={data.lastName}
                onChange={(e) => handleChange(e, "lastName")}
              />
              {errors.lastName && <span className="text-sm text-red-500">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={data.email}
                onChange={(e) => handleChange(e, "email")}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={data.phone}
                onChange={(e) => handleChange(e, "phone")}
              />
              {errors.phone && <span className="text-sm text-red-500">{errors.phone}</span>}
            </div>

            {/* Company */}
            <div className="grid gap-1.5">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={data.company}
                onChange={(e) => handleChange(e, "company")}
              />
              {errors.company && <span className="text-sm text-red-500">{errors.company}</span>}
            </div>

            {/* Employees */}
            <div className="grid gap-1.5">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                min={1}
                placeholder="50"
                value={data.employees}
                onChange={(e) => handleChange(e, "employees")}
              />
              {errors.employees && <span className="text-sm text-red-500">{errors.employees}</span>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
