"use client";

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date";
}

export default function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-white text-sm font-medium">{label}</label>
      <div className="relative">
        {type === "date" && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cosmic-blue/50 focus:bg-white/10 transition-all backdrop-blur-sm ${
            type === "date" ? "pl-12" : ""
          }`}
        />
      </div>
    </div>
  );
}