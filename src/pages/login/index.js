import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/slice/loginSlice";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState({ value: "", errMsg: "" });
  const [password, setPassword] = useState({ value: "", errMsg: "" });

  const handleAccountChange = (e) => {
    setAccount({ value: e.target.value, errMsg: "" });
  };
  const handlePasswordChange = (e) => {
    setPassword({ value: e.target.value, errMsg: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const postData = {
      email: account.value,
      password: password.value,
    };
    dispatch(loginAsync(postData)).then((res) => {
      if (res.type === "login/rejected") {
        console.log("fetchLogin err:", res.payload.errors);
        setAccount({ value: account.value, errMsg: res.payload.message });
        setPassword({ value: password.value, errMsg: res.payload.message });
      } else if (res.type === "login/fulfilled") {
        navigate(`/`);
      }
    });
  };

  return (
    <LoginPageContainer>
      <LoginForm id="loginForm">
        <CustomInput
          label="Account"
          type="text"
          name="account"
          handleOnchange={handleAccountChange}
          value={account.value}
          errMsg={account.errMsg && account.errMsg}
          isValid={!account.errMsg}
          required={true}
        />
        <CustomInput
          label="Password"
          type="password"
          name="password"
          handleOnchange={handlePasswordChange}
          value={password.value}
          errMsg={password.errMsg && password.errMsg}
          isValid={!password.errMsg}
          required={true}
        />
        <LoginButton
          type={"submit"}
          onClick={handleLogin}
          disabled={!account.value || !password.value}
        >
          Login
        </LoginButton>
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.form`
  flex-direction: column;
  width: 300px;
  margin-top: 100px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  color: #013b81;
  padding-top: 0;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  height: 48px;
  margin-top: 50px;
  background: #013b81;
  border: none;
  border-radius: 5px;
  color: #fff;

  ${(props) =>
    props.disabled === true &&
    css`
      background: #eee;
      color: #ddd;
    `}
`;
