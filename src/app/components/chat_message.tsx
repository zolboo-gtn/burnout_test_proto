"use client";

import { Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import RatingScale from "@/app/components/rating_scale";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant" | "system" | "data";
    content: string;
    id?: string;
  };
  onRatingSelect?: (rating: number) => void;
}

export default function ChatMessage({
  message,
  onRatingSelect,
}: ChatMessageProps) {
  if (message.role === "system" || message.role === "data") {
    return null;
  }

  const isUser = message.role === "user";
  const sanitizedContent = message.content
    .replace(/<working_memory>[\s\S]*?<\/working_memory>/g, "")
    .trim();

  return (
    <div className={cn("flex items-start gap-3", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-teal-100 flex items-center justify-center">
          <Bot className="h-4 w-4 text-teal-700" />
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser
            ? "bg-teal-600 text-white rounded-tr-none"
            : "bg-slate-100 text-slate-800 rounded-tl-none"
        )}
      >
        <div className="whitespace-pre-wrap">{sanitizedContent}</div>

        {!isUser && onRatingSelect && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <RatingScale onSelect={onRatingSelect} />
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-teal-600 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </Avatar>
      )}
    </div>
  );
}
