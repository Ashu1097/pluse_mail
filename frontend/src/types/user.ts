export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  avatarUrl?: string;
  provider: "google";
}

export interface Session {
  user: User;
  connectedAt: string;
}
