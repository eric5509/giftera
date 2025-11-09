export type UserRole = "BUYER" | "VENDOR" | "ADMIN";
export type UserStatus =
  | "PENDING"
  | "SUSPENDED"
  | "BLOCKED"
  | "ACTIVE"
  | "INACTIVE";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string; // optional profile picture
  createdAt: string;
  updatedAt?: string;
};

export type CreateUserInput = {
  fullName: string;
  email: string;
  phone?: string;
  password: string 
};

export type UserDataStore = {
  users: User[];
  filters: { role?: UserRole };
  pagination: { page: number; limit: number };
  hasMore: boolean;
  loading: boolean;

  setFilters: (filters: Partial<UserDataStore["filters"]>) => void;
  fetchUsers: () => Promise<void>;
  fetchMoreUsers: () => Promise<void>;
};
