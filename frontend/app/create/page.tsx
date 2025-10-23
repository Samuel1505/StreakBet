"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FormField from "@/components/create/FormField";
import ThumbnailUpload from "@/components/create/ThumbnailUpload";
import CreateButton from "@/components/create/CreateButton";

export default function CreateMarket() {
  const [formData, setFormData] = useState({
    marketQuestion: "",
    underlyingAsset: "",
    resolutionSource: "",
    resolutionDate: "",
    initialLiquidity: "",
    thumbnail: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-glow">
              Create Market
            </h1>
            <p className="text-text-muted text-lg">
              Define your parameter for new market prediction market
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                <FormField
                  label="Market Question"
                  placeholder="e.g Will SOL hit $2,000 on 01-Jan-2025"
                  value={formData.marketQuestion}
                  onChange={(value) => handleInputChange("marketQuestion", value)}
                />

                <FormField
                  label="Underlying Asset"
                  placeholder="e.g SOL, Timer"
                  value={formData.underlyingAsset}
                  onChange={(value) => handleInputChange("underlyingAsset", value)}
                />

                <FormField
                  label="Resolution Source"
                  placeholder="e.g A reliable source or API endpoint"
                  value={formData.resolutionSource}
                  onChange={(value) => handleInputChange("resolutionSource", value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Resolution Date"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={formData.resolutionDate}
                    onChange={(value) => handleInputChange("resolutionDate", value)}
                  />

                  <FormField
                    label="Initial Liquidity"
                    placeholder="e.g 2c, 3000"
                    value={formData.initialLiquidity}
                    onChange={(value) => handleInputChange("initialLiquidity", value)}
                  />
                </div>
              </div>

              {/* Right Column - Thumbnail Upload */}
              <div>
                <ThumbnailUpload
                  onFileChange={handleThumbnailChange}
                  currentFile={formData.thumbnail}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-8">
              <CreateButton />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}