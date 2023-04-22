import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import "./App.css";
import Layout from "./components/Layout";
import Signin from "./pages/Signin";
import NoPage from "./components/NoPage";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import ReadingList from "./components/ReadingList";
import Tag from "./components/Tag";
import NewFeed from "./components/NewFeed";
import {
  ViewProfile,
  EditProfile,
  Dashboard,
  Setting,
  Custom,
} from "./components/Profile";
import CreatePost from "./components/CreatePost";
import Toast from "./components/Toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateAccount from "./pages/ActivateAccount";
import CreatNewPassword from "./pages/CreateNewPassword";

function App() {
  const message = useSelector((state) => state.messageStore?.message);
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const publicRoutes = [
    "/",
    "/tag",
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-new-password",
    "/activate",
  ];

  useEffect(() => {
    if (!publicRoutes.includes(pathname) && !user?.accessToken) {
      navigate("/signin");
    }
  }, [pathname]);

  return (
    <div className="App">
      <div
        className={`fixed top-[80px] right-8 z-50 ${
          message ? "block" : "hidden"
        }`}
      >
        {message && <Toast type={message?.type} message={message?.message} />}
      </div>

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<NewFeed />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/tag" element={<Tag />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile/view" element={<ViewProfile />} />
          <Route path="/profile/setting" element={<Setting />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="custom" element={<Custom />} />
          </Route>
        </Route>
        <Route path="activate" element={<ActivateAccount />} />
        <Route
          path="signin"
          element={accessToken ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="signup"
          element={accessToken ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="create-new-password" element={<CreatNewPassword />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
