import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

    function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
