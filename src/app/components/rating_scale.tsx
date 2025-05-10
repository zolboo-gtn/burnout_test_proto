"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RatingScaleProps {
  onSelect: (rating: number) => void;
}

export default function RatingScale({ onSelect }: RatingScaleProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSelect = (rating: number) => {
    setSelectedRating(rating);
    onSelect(rating);
  };

  const ratings = [
    { value: 0, label: "Never" },
    { value: 1, label: "Few times a year" },
    { value: 2, label: "Once a month" },
    { value: 3, label: "Few times a month" },
    { value: 4, label: "Once a week" },
    { value: 5, label: "Few times a week" },
    { value: 6, label: "Every day" },
  ];

  return (
    <div className="w-full py-2 space-y-2">
      <div className="flex gap-1 w-full flex-wrap">
        {ratings.map((rating) => (
          <Button
            key={rating.value}
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 h-10 flex flex-col gap-0.5 items-center justify-center transition-all text-xs",
              selectedRating === rating.value &&
                "bg-teal-100 border-teal-600 text-teal-800"
            )}
            onClick={() => handleSelect(rating.value)}
          >
            <span className="font-medium">{rating.value}</span>
            <span className="text-[9px] leading-tight text-center hidden sm:block">
              {rating.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
