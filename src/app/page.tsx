import BurnoutChat from "./components/chat";
import UserInfo from "./components/user_info";
export default function BurnoutAssessmentPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <BurnoutChat />
      <UserInfo />
    </main>
  );
}
