import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

function App() {

  const {onlineUsers} = useAuthStore();
  console.log("onlineUsers", onlineUsers);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}



export default App;
