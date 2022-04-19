import React from "react";
import styled from "styled-components";

const CustomInput = (props) => {
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Label>{props.label}</Label>
        {props.isValid === false && <ErrMsg>{props.errMsg}</ErrMsg>}
      </div>
      {props.type === "select" ? (
        <Select
          type={props.type}
          name={props.name}
          onInput={(text) => props.handleOnchange(text)}
          // deDaultValue={''}
          value={props.selectData.value}
        >
          <option value={""} title={'Choose'}>
            {'Choose...'}
          </option>

          {props.selectDatas.map((data) => (
            <option value={data.post_id} key={data.post_id} title={data.title}>
              {data.title}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={props.type}
          name={props.name}
          onChange={(text) => props.handleOnchange(text)}
          value={props.valueaccount}
          required={props.required}
          maxLength={props.maxLength || 40 }
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: none;
  outline: 0;
  border-bottom: 1px solid #013b81;
  font-size: 14px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: none;
  outline: 0;
  border-bottom: 1px solid #013b81;
  font-size: 14px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #4a4a4a;
`;
const ErrMsg = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: red;
  margin-left: 10px;
`;

export default CustomInput;
