export type ChatType = "TEXT" | "IMAGE";

// entities/chat/types/chat.ts
export type Chat = {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  requestId: string
  content: string;      
  type: ChatType
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
};


export type CreateChatInput = {
  conversationId: string;
  senderId: string;
  receiverId: string;
  requestId: string
  content: string | File; // 🧠 text or image file
  type?: ChatType; // "text" | "image"
};


export type UpdateChatInput = {
  id: string;
  content?: string;
  isRead?: boolean;
};

export type GetChatsParams = {
  conversationId?: string;
  senderId?: string;
  receiverId?: string;
  limit?: number;
  page?: number;
  sortBy?: keyof Chat;
  sortOrder?: "asc" | "desc";
};

export type ChatDataStore = {
  chats: Chat[];
  filters: {
    conversationId?: string;
    senderId?: string;
    receiverId?: string;
    type?: ChatType;
    isRead?: boolean;
  };
  sorting: {
    sortBy: keyof Chat;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  hasMore: boolean;
  loading: boolean;

  // Actions
  setChats: (chats: Chat[]) => void;
  appendChats: (chats: Chat[]) => void;
  updateChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
  setFilter: (filter: Partial<ChatDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<ChatDataStore["sorting"]>) => void;
  reset: () => void;

  fetchChats: () => Promise<void>;
  fetchMoreChats: () => Promise<void>;
};
