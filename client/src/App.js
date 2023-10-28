import { useState, useEffect } from "react";
import "./App.css";
import Player from "./components/player/Player";
import LandingView from "./components/views/landing/LandingView";
import MainView from "./components/views/main/MainView";
import SignUpView from "./components/views/signup/SignUpView";
import LogInView from "./components/views/signup/LogInView"
import Navigation from "./components/navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AlertList from "./components/alerts/AlertList";
import { useDispatch } from "react-redux";
import { getUserAction } from "./actions/user";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserAction());
    }
  }, [])

  return (
    <div className="main">
      <Navigation />

      <div className='middle'>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/login" element={<LogInView />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/main" element={<MainView />} />
          </Route>
        </Routes>
      </div>
      <AlertList />
    </div>
  )
}

export default App;
