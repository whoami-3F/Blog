import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/AuthService";
import AuthSlice, { login, logout } from "./store/AuthSlice";
import { Header, Footer } from "./components/index";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch;
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // will not change status(false)
          dispatch(logout());
        }
      })
      // TODO: add catch
      .finally(() => setLoading(false));
  }, []);

  // TODO: Improve conditional Rendering
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        {/* TODO: crete outlet */}
        <main></main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
