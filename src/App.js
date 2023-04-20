import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateAccount from "./pages/ActivateAccount";

function App() {
  const message = useSelector((state) => state.messageStore?.message);

  return (
    <div className="App">
      <div
        className={`fixed top-[80px] right-8 z-50 ${
          message ? "block" : "hidden"
        }`}
      >
        {message && <Toast type={message?.type} message={message?.message} />}
      </div>
      {/* <button className="mt-[500px]" onClick={() => setShowMessage({isDone: !showMessage.isDone || false})}>showMessage</button> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />} /> */}
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
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgetPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
