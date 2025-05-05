import { Route, Routes } from "react-router";
import Store from "./layouts/Store";
import Login from "./pages/Login";
import { User } from "./types/types";
import { useUser } from "./context/UserProvider";
import Register from "./pages/Register";

function App() {
  const userItem = localStorage.getItem("user");
  const { setUser } = useUser();
  if (userItem) {
    const user: User = JSON.parse(userItem);
    setUser(user);
  }
  return (
    <Routes>
      <Route path="/" element={<Store />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
