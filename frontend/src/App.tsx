import { Route, Routes } from "react-router";
import Store from "./layouts/Store";
import Login from "./pages/Login";
import { User } from "./types/domain/user";
import { useUser } from "./context/UserProvider";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
