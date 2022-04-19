import React, { useEffect } from "react";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import MyWebinarPage from "./pages/myWebinar";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "store2";
import { httpClient } from "./api/httpClient";
import { useDispatch } from "react-redux";
import { checkUserByToken } from "./redux/slice/loginSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = store.session.get("token");
    if (token) {
      httpClient.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch(checkUserByToken());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my_webinars" element={<MyWebinarPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
