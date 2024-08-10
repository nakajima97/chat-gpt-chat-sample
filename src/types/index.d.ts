export type Role = 'user' | 'assistant';

export type ChatHistory = {
  id: number;
  content: string;
  role: Role;
};

export type ChatHistories = ChatHistory[];