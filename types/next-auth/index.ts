export type SessionType = {
  id: string;
  username: string;
  token: string;
  name?: string;
  email?: string;
  image?: string;
  profilePicture?: string;
} | null;
