"use client";

interface CategoryBadgeProps {
  category: "Crypto" | "Sports" | "Politics" | "Entertainment";
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const getCategoryStyles = () => {
    switch (category) {
      case "Crypto":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Sports":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Politics":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Entertainment":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-white/5 text-white border-white/10";
    }
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryStyles()}`}
    >
      {category}
    </span>
  );
}