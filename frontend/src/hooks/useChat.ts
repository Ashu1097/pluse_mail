"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getInitialChat, sendMessage } from "@/services/chat";
import type { ChatMessage } from "@/types";

let localIdCounter = 0;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data: initialMessages } = useQuery({
    queryKey: ["chat-initial"],
    queryFn: getInitialChat,
  });

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (assistantMessage) => {
      setMessages((m) => [...m, assistantMessage]);
    },
  });

  function ask(text: string) {
    if (!text.trim()) return;
    const userMessage: ChatMessage = {
      id: `u${localIdCounter++}`,
      role: "user",
      text,
    };
    setMessages((m) => [...m, userMessage]);
    mutation.mutate(text);
  }

  return {
    messages,
    ask,
    isSending: mutation.isPending,
  };
}
