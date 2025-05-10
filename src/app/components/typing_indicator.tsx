export default function TypingIndicator() {
  return (
    <div className="bg-slate-100 text-slate-800 rounded-lg rounded-tl-none px-4 py-2 max-w-[80%]">
      <div className="flex space-x-1">
        <div
          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
