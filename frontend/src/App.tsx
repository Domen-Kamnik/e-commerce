import { Route, Routes } from "react-router";
import Store from "./layouts/Store";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />}></Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
