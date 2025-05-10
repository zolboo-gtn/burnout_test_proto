import { cn } from "@/lib/utils";

interface Stage {
  name: string;
  questions: number;
}

interface ProgressIndicatorProps {
  stages: Stage[];
  currentStage: number;
  currentQuestion: number;
}

export default function ProgressIndicator({
  stages,
  currentStage,
  currentQuestion,
}: ProgressIndicatorProps) {
  // Calculate overall progress percentage
  const totalQuestions = stages.reduce(
    (sum, stage) => sum + stage.questions,
    0
  );
  let completedQuestions = 0;

  // Count completed questions
  for (let i = 0; i < currentStage - 1; i++) {
    completedQuestions += stages[i].questions;
  }
  completedQuestions += currentQuestion - 1;

  const progressPercentage = Math.round(
    (completedQuestions / totalQuestions) * 100
  );

  return (
    <div className="px-4 py-3 bg-white border-b">
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">
          Assessment Progress
        </span>
        <span className="text-sm font-medium text-slate-700">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-3">
        <div
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Stage indicators */}
      <div className="flex justify-between">
        {stages.map((stage, index) => {
          const stageNumber = index + 1;
          const isActive = currentStage === stageNumber;
          const isCompleted = currentStage > stageNumber;

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                  isActive
                    ? "bg-teal-600 text-white"
                    : isCompleted
                    ? "bg-teal-100 text-teal-800"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {stageNumber}
              </div>
              <span
                className={cn(
                  "text-xs text-center max-w-[80px] line-clamp-1",
                  isActive
                    ? "text-teal-800 font-medium"
                    : isCompleted
                    ? "text-teal-600"
                    : "text-slate-500"
                )}
              >
                {stage.name}
              </span>
              {isActive && (
                <span className="text-xs text-teal-600 mt-1">
                  Q{currentQuestion}/{stage.questions}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
