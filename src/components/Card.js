import React from "react";
import styled from "styled-components";
import Images from "../assets/images";
import moment from "moment";
import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_LG,
} from "../styles/constants";
import { useDispatch } from "react-redux";
import { fetchMyList, deleteMyList, setSelectData } from "../redux/slice/postSlice";

const Card = ({ post, index }) => {
  const dispatch = useDispatch();

  const contentText = JSON.parse(post?.content)?.blocks.map((block, i) => {
    if (i === 0) {
      return "";
    }
    return block.text;
  });
  const startDate = post?.created_at
    .split(" ")[0]
    .split("-")
    .reverse()
    .join("/");

  const from = moment(post?.created_at).format("YYYY/MM/DD hh:mm A");
  const to = moment(post?.created_at)
    .add(10, "days")
    .format("YYYY/MM/DD hh:mm A");

  const handleClick = () => {
    if (post.favourited) {
      dispatch(deleteMyList(post.post_id));
      dispatch(fetchMyList());
    } else {
      const section = document.querySelector("#registerForm");
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(setSelectData({value: post.post_id, title: post.title}));
    }
  };
  return (
    <Container>
      <Date>{startDate}</Date>
      <Title>{post?.title}</Title>
      <Content>{contentText}</Content>
      <Time>{`${from}-${to}`}</Time>
      <RegisterButton onClick={handleClick}>
        <div>{post.favourited ? "UnRegister Now" : "Register Now"}</div>
        <Icon src={Images.oval} alt={"icon"} width={30} height={30}></Icon>
      </RegisterButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 20px;
  font-style: normal;
  font-weight: 900;
  height: 300px;
  margin: 10px;
  background: #fff;
  ${MEDIA_QUERY_LG} {
    max-width: 340px;
  }
  ${MEDIA_QUERY_MD} {
    max-width: 300px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
  }
`;

const Date = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #01254f;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #01254f;
  margin-top: 20px;
`;

const Content = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
  max-height: 60px;
  overflow: hidden;
  margin-top: 12px;
`;

const Time = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
  max-height: 60px;
  overflow: hidden;
  margin-top: 20px;
`;

const RegisterButton = styled.button`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  color: #6bb718;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
`;
const Icon = styled.img`
  position: absolute;
  right: 40px;
  cursor: pointer;
`;

export default Card;
