import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, AlertCircle, Sparkles } from "lucide-react";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  employees: string;
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
  const [focusedField, setFocusedField] = useState<keyof SignUpFormData | null>(
    null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof SignUpFormData
  ) => {
    setData({ ...data, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const validate = (): boolean => {
    const newErrors: SignUpErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/i.test(data.email)
    ) {
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
      if (Number.isNaN(num) || num <= 0)
        newErrors.employees = "Enter a positive number";
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/error
      if (Math.random() > 0.3) {
        setIsSuccess(true);
        setData(initialData);
      } else {
        throw new Error("Failed to create account. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    id,
    label,
    type = "text",
    placeholder,
    field,
  }: {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    field: keyof SignUpFormData;
  }) => (
    <div className="group relative">
      <Label
        htmlFor={id}
        className={`text-sm font-medium transition-colors duration-200 ${
          focusedField === field ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {label}
      </Label>
      <div className="relative mt-1.5">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={data[field]}
          onChange={(e) => handleChange(e, field)}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          className={`transition-all duration-300 ${
            errors[field]
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : focusedField === field
              ? "border-blue-400 focus:border-blue-500 focus:ring-blue-200 shadow-md"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-100"
          }`}
        />
        {focusedField === field && (
          <div className="absolute inset-0 rounded-md ring-2 ring-blue-200 pointer-events-none animate-pulse" />
        )}
      </div>
      {errors[field] && (
        <div className="flex items-center gap-1 mt-1 animate-slide-down">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-500">{errors[field]}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <Card className="w-full max-w-lg relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-slide-up">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <Sparkles className="w-6 h-6 text-purple-600 animate-pulse delay-500" />
          </div>
          <p className="text-gray-600 text-sm">
            Join thousands of companies already using our platform
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {isSuccess && (
            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg animate-slide-down">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Account created successfully!
              </span>
            </div>
          )}

          {apiError && (
            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg animate-shake">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">{apiError}</span>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="firstName"
                label="First Name"
                placeholder="John"
                field="firstName"
              />
              <InputField
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                field="lastName"
              />
            </div>

            <InputField
              id="email"
              label="Work Email"
              type="email"
              placeholder="john@company.com"
              field="email"
            />

            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="9876543210"
              field="phone"
            />

            <InputField
              id="company"
              label="Company Name"
              placeholder="Acme Inc."
              field="company"
            />

            <InputField
              id="employees"
              label="Number of Employees"
              type="number"
              placeholder="50"
              field="employees"
            />

            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4">
            Already have an account?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
