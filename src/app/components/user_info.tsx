"use client";

import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export default function UserInfo() {
  const [userId, setUserId] = useSessionStorage("user-id", "");
  const [threadId, setThreadId] = useSessionStorage("thread-id", "");

  useEffect(() => {
    if (!userId || !threadId) {
      fetch("/api/user_info", {
        method: "POST",
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
        setUserId(data.userId);
        setThreadId(data.threadId);
      });
    }
  }, []);

  return null;
}
