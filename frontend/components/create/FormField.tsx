"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date" | "datetime-local";
  error?: string;
  isValid?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  isValid,
  helperText,
  required = false,
}: FormFieldProps) {
  const hasError = !!error;
  const showValidState = isValid && value && !hasError;

  return (
    <div className="space-y-2">
      <label className="block text-white text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {type === "date" || type === "datetime-local" ? (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        ) : null}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-text-muted/50 focus:outline-none focus:ring-2 transition-all backdrop-blur-sm ${
            type === "date" || type === "datetime-local" ? "pl-12 pr-12" : "pr-12"
          } ${
            hasError
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : showValidState
              ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
              : "border-white/10 focus:border-cosmic-blue/50 focus:ring-cosmic-blue/20 focus:bg-white/10"
          }`}
          aria-invalid={hasError}
          aria-describedby={error || helperText ? `${label}-help` : undefined}
        />
        {showValidState && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
        )}
        {hasError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          id={`${label}-help`}
          className={`text-xs ${
            hasError ? "text-red-400" : "text-text-muted"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}