import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Images from "../assets/images";
import { hasToken } from "../utils";
import store from "store2";
import { httpClient, registerCallback } from "../api/httpClient";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/API";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = window.location.pathname;
  const [auth, setAuth] = useState(hasToken());

  useEffect(() => {
    if (hasToken()) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [pathname]);

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleLogout = async () => {
    try {
      const { data } = await API.logout();
      if (data.status_code === 200) {
        clearSession();
      }
    } catch (err) {
      clearSession();
    }
  };

  const handleMyWebinar = async () => {
    if (window.location.pathname === `/my_webinars`) {
      navigate(`/`);
    } else {
      navigate(`/my_webinars`);
    }
  };

  const clearSession = () => {
    store.session.clearAll();
    httpClient.defaults.headers.Authorization = null;
    setAuth(false);
  };

  useEffect(() => {
    registerCallback("logout", handleLogout.bind(this));
    registerCallback("clearSession", clearSession.bind(this));
    registerCallback("navigate", navigate.bind(this));
  })

  return (
    <HeaderContainer>
      <Logo src={Images.logo} alt={"logo"} width={132} height={60} />
      {auth ? (
        <div style={{ display: "flex", position: "absolute", right: "6.5%" }}>
          <FullButton onClick={handleMyWebinar}>
            {window.location.pathname === `/my_webinars`
              ? "Webinars"
              : "My Webinar"}
          </FullButton>
          <Button onClick={handleLogout}>logout</Button>
        </div>
      ) : location.pathname === "/login" ? null : (
        <div style={{ display: "flex", position: "absolute", right: "6.5%" }}>
          <Button onClick={handleLogin}>login</Button>
        </div>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: relative;
  left: 0.22%;
  display: flex;
  height: 132px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const Logo = styled.img`
  position: absolute;
  left: 6.81%;
`;

const Button = styled.button`
  background: #ffffff;
  border: 1px solid #013b81;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
`;

const FullButton = styled.button`
  background: #013b81;
  border: none;
  color: #fff;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  padding: 10px 16px;
  cursor: pointer;
`;
