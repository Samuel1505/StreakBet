"use client";

import { useRef, useState } from "react";

interface ThumbnailUploadProps {
  onFileChange: (file: File | null) => void;
  currentFile: File | null;
}

export default function ThumbnailUpload({
  onFileChange,
  currentFile,
}: ThumbnailUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-white text-sm font-medium">Thumbnail</label>
      <div
        onClick={handleClick}
        className="relative h-64 bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cosmic-blue/50 hover:bg-white/10 transition-all group backdrop-blur-sm overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Thumbnail preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted group-hover:text-cosmic-blue transition-colors"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="9" />
                <line x1="12" y1="6" x2="12" y2="18" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-text-muted group-hover:text-cosmic-blue transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-sm font-medium">Add Image</span>
            </div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}