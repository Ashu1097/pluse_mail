export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  confidence?: number;
  relatedIds?: string[];
}

export interface ChatResponse {
  message: ChatMessage;
}
