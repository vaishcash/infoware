import React, { useState } from "react";
import type { FormField } from "../types/form";
import { useTheme } from "../context/ThemeContext";
import SubmissionSuccess from "./SubmissionSuccess";

interface FormPreviewProps {
  fields: FormField[];
}

export default function FormPreview({ fields }: FormPreviewProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field: FormField, value: string): string => {
    if (field.required && !value) {
      return "This field is required";
    }

    if (field.validation) {
      if (
        field.validation.pattern &&
        !new RegExp(field.validation.pattern).test(value)
      ) {
        return "Invalid format";
      }
      if (field.validation.min && Number(value) < field.validation.min) {
        return `Minimum value is ${field.validation.min}`;
      }
      if (field.validation.max && Number(value) > field.validation.max) {
        return `Maximum value is ${field.validation.max}`;
      }
      if (
        field.validation.minLength &&
        value.length < field.validation.minLength
      ) {
        return `Minimum length is ${field.validation.minLength}`;
      }
      if (
        field.validation.maxLength &&
        value.length > field.validation.maxLength
      ) {
        return `Maximum length is ${field.validation.maxLength}`;
      }
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field.id]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field.id]: error,
    }));
  };

  if (submitted) {
    return <SubmissionSuccess formData={formData} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6"
    >
      {fields.map((field) => (
        <div key={field.id} className="space-y-2"
        >
          
          <label
            className="block font-medium"
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.base,
            }}
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            />
          )}

          {errors[field.id] && (
            <p className="text-red-500 text-sm">{errors[field.id]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-md transition-all hover:scale-105"
        style={{
          backgroundColor: theme.colors.primary,
          color: "white",
          fontSize: theme.typography.fontSize.base,
        }}
      >
        Submit Form
      </button>
    </form>
  );
}
