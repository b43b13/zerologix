/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_MD_0,
  MEDIA_QUERY_LG,
} from "../styles/constants";
import CustomInput from "./CustomInput";
import { getValidatedField } from "../utils";
import {
  fetchPostList,
  selectPostList,
  setSelectData,
} from "../redux/slice/postSlice";
import API from "../api/API";

const inputDefault = Object.freeze({
  topic: {
    type: "select",
    title: "Topic",
    keyid: "topic",
    value: "",
    errMsg: "require",
  },
  firstName: {
    type: "text",
    title: "First Name",
    keyid: "firstName",
    value: "",
    errMsg: "require",
    pattern: [/^[A-Za-z0-9]{1,20}$/],
    required: true,
    isValid: null,
  },
  lastName: {
    type: "text",
    title: "Last Name",
    keyid: "lastName",
    value: "",
    errMsg: "require",
    required: true,
    pattern: [/^[A-Za-z0-9]{1,20}$/],
    isValid: null,
  },
  email: {
    type: "text",
    title: "Email",
    keyid: "email",
    value: "",
    errMsg: "wrong type, please type email format",
    required: true,
    pattern: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    isValid: null,
  },
});

const Register = () => {
  const dispatch = useDispatch();
  const { postList, selectData } = useSelector(selectPostList);
  const [inputInfo, setInputInfo] = useState(inputDefault);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    inputInfo["topic"].value = selectData.value;
    setInputInfo(inputInfo);
  }, [selectData]);

  useEffect(() => {
    let hasError = Object.values(inputInfo).some((i) => {
      if (i !== "topic") return i.isValid === false || i.value === "";
      return false;
    });
    if (!selectData.value) {
      hasError = true;
    }
    if (!hasError) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
    // console.log('hasError', hasError)
  }, [inputInfo]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleInputChange = (key) => (e) => {
    if (inputInfo[key].type === "select") {
      dispatch(setSelectData({ value: e.target.value }));
    }

    let newField;
    if (inputInfo[key].pattern) {
      newField = getValidatedField(inputInfo[key].pattern, {
        ...inputInfo[key],
        value: e.target.value,
      });
    } else {
      newField = {
        ...inputInfo[key],
        value: e.target.value,
      };
    }

    let newObj = Object.assign({}, inputInfo);
    newObj[key] = newField;
    setInputInfo(newObj);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let postData = {
        topic: inputInfo.topic.value,
        firstName: inputInfo.firstName.value,
        lastName: inputInfo.lastName.value,
        email: inputInfo.email.value,
      };

      const { data } = await API.addFavourite(inputInfo.topic.value, postData);

      if (data.status_code === 200) {
        document.getElementById("registerForm").reset();
        setInputInfo(inputDefault);
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
        dispatch(fetchPostList());
      }
    } catch (err) {
      console.log("handleRegister err:", err.status);
    }
  };
  return (
    <Container>
      <ReigisterForm id={"registerForm"}>
        <Title>Register for a Webinar now</Title>
        <SubTitle>
          Please fill in the form below and you will be contacted by one of our
          professional business experts.
        </SubTitle>
        {Object.keys(inputInfo).map((key) => {
          return (
            <CustomInput
              key={key}
              {...inputInfo[key]}
              label={inputInfo[key].title}
              type={inputInfo[key].type}
              name={inputInfo[key].keyid}
              handleOnchange={handleInputChange(key)}
              isValid={inputInfo[key].isValid}
              errMsg={inputInfo[key].errMsg}
              selectDatas={inputInfo[key].type === "select" && postList}
              selectData={inputInfo[key].type === "select" && selectData}
            />
          );
        })}
        <SubmitButton
          type={"submit"}
          onClick={handleRegister}
          disabled={!isReadyToSubmit}
        >
          Register
        </SubmitButton>
      </ReigisterForm>
    </Container>
  );
};
export default Register;

const Container = styled.div`
  padding: 20px;
  min-height: 748px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  box-shadow: 0px 4px 14px rgba(132, 132, 132, 0.5);
  border-radius: 20px;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 477px;

  ${MEDIA_QUERY_LG} {
    max-width: 1180px;
  }
  ${MEDIA_QUERY_MD} {
    max-width: 1064px;
  }
  ${MEDIA_QUERY_MD_0} {
    max-width: 700px;
  }
  ${MEDIA_QUERY_SM} {
    box-shadow: none;
    border: none;
  }
`;
const Title = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  /* identical to box height, or 136% */

  text-align: center;

  color: #01254f;
  margin-top: 60px;
`;
const SubTitle = styled.div`
  max-width: 580px;
  margin-top: 20px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  text-align: center;

  color: rgba(0, 0, 0, 0.65);
`;
const ReigisterForm = styled.form`
  padding: 20px;
  max-width: 580px;
  margin: auto;
`;

const SubmitButton = styled.button`
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
