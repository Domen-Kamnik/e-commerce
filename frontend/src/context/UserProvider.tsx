import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, UserContextType } from "../types/domain/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      const user: User = JSON.parse(userItem);
      setUser(user);
    }
  }, []);
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
