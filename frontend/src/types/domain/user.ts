export type User = {
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
