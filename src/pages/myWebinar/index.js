import React, { useEffect } from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_MD_0,
  MEDIA_QUERY_LG,
} from "../../styles/constants";

import Card from "../../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyList, selectPostList } from "../../redux/slice/postSlice";

const MyWebinarPage = () => {
  const dispatch = useDispatch();
  const {myList} = useSelector(selectPostList);

  useEffect(() => {
    dispatch(fetchMyList());
  }, []);

  return (
    <div>
      <Title>Forex Webinars</Title>
      <SubTitle>
        Whether you are new to foreign exchange trading or already have some
        market experience, we believe that a solid FX trading education is vital
        to your success as a trader.
      </SubTitle>
      <div style={{ backgroundColor: "#f2f2f2", width: "100%" }}>
        <CardContainer>
          {myList.length > 0 ? (
            myList.map((post, index) => {
              return (
                <Card
                  post={post}
                  index={index}
                  key={`content-${index}`}
                  style={index % 3 !== 0 && { alignContent: "flex-start" }}
                />
              );
            })
          ) : (
            <Loading>loading...</Loading>
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default MyWebinarPage;

const Loading = styled.div`
  margin-top: 87px;
  margin-top: 88px;
  display: flex;
  width: 100%;
  min-height: 800px;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  text-align: center;
`;
const Title = styled.div`
  margin-top: 87px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: #01254f;
`;
const SubTitle = styled.div`
  height: 48px;
  margin: auto;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);

  ${MEDIA_QUERY_LG} {
    max-width: 800px;
  }
  ${MEDIA_QUERY_MD} {
    max-width: 680px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 340px;
  }
`;
const CardContainer = styled.div`
  margin: auto;
  margin-top: 88px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 70px;
  padding-bottom: 70px;
  ${MEDIA_QUERY_LG} {
    max-width: 1200px;
  }
  ${MEDIA_QUERY_MD} {
    max-width: 1080px;
  }
  ${MEDIA_QUERY_MD_0} {
    max-width: 720px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 360px;
  }
`;
