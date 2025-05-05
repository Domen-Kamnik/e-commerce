import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function Store() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Store;
