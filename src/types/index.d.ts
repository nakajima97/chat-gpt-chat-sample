export type Role = 'user' | 'bot';

export type ChatHistory = {
  id: number;
  message: string;
  role: Role;
};

export type ChatHistories = ChatHistory[];