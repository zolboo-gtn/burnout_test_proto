"use client";

import { useChat } from "@ai-sdk/react";
import type React from "react";
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEventHandler,
} from "react";
import { Bot, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChatMessage from "@/app/components/chat_message";
import TypingIndicator from "@/app/components/typing_indicator";
import ProgressIndicator from "@/app/components/progress_indicator";

type Message = {
  role: "user" | "assistant";
  content: string;
  showRating?: boolean;
  id?: string;
};

export default function BurnoutChat() {
  const { messages, input, append, handleInputChange, handleSubmit, status } =
    useChat({
      api: "/api/burnout_test",
      onFinish: (message) => {
        const stage = message.content.match(/Stage: (\d+)/)?.[1];
        const question = message.content.match(/Question: (\d+)/)?.[1];
        if (stage !== undefined && question !== undefined) {
          setCurrentStage(parseInt(stage));
          setCurrentQuestion(parseInt(question));
        }
      },
    });
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentStage, setCurrentStage] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    append({
      role: "user",
      content: "#START",
    });
  }, []);

  const handleRatingSelect = async (rating: number) => {
    await append({
      role: "user",
      content: rating.toString(),
    });
  };

  return (
    <Card className="w-full max-w-md md:max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-lg border-slate-200">
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-teal-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-teal-700" />
          </Avatar>
          <h1 className="text-lg font-medium">Burnout Assessment Assistant</h1>
        </div>
      </div>

      {currentStage > 0 && currentQuestion > 0 && (
        <ProgressIndicator
          stages={[
            {
              name: "Emotional exhaustion",
              questions: 9,
            },
            {
              name: "Work-related cynicism or detachment",
              questions: 5,
            },
            {
              name: "Reduced professional accomplishment",
              questions: 8,
            },
          ]}
          currentStage={currentStage}
          currentQuestion={currentQuestion}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter(
            (message) =>
              message.role !== "system" &&
              message.role !== "data" &&
              message.content !== "#START"
          )
          .map((message) => {
            const stage = message.content.match(/Stage: (\d+)/)?.[1];
            const question = message.content.match(/Question: (\d+)/)?.[1];

            return (
              <ChatMessage
                key={message.id}
                message={message}
                onRatingSelect={
                  status === "ready" &&
                  currentStage.toString() === stage &&
                  currentQuestion.toString() === question
                    ? handleRatingSelect
                    : undefined
                }
              />
            );
          })}

        {status === "submitted" && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 bg-teal-100 flex items-center justify-center">
              <Bot className="h-4 w-4 text-teal-700" />
            </Avatar>
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={
            activeQuestionId
              ? "Please use the rating scale above to answer the question"
              : assessmentComplete
              ? "Type your message..."
              : "Assessment in progress..."
          }
          className="flex-1"
          disabled={!!activeQuestionId && !assessmentComplete}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!!activeQuestionId && !assessmentComplete}
          className="flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
