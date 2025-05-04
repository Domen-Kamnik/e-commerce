import { createContext, ReactNode, useContext, useState } from "react";
import { User, UserContextType } from "../types/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error();
  return userContext;
}

export default UserProvider;
