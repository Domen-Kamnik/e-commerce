import { Route, Routes } from "react-router";
import Store from "./layouts/Store";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />}></Route>
    </Routes>
  );
}

export default App;
