import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";

const dayCost = 10000;
const monthCost = 300000;

const ResultSave: FunctionComponent<any> = ({}) => {
  const money: Number = 0;

  var now = new Date();
  var month = now.getMonth


  const checkResult = () => {
    console.log(date.getDate());
  };

  return (
    <>
      <StyledText>
        <h1>Result Page</h1>

        <h3>
          오늘 하루 식비를
          <br />
          {money}원<br />
          더 쓰셨다는 사실
          <br />
          먹어서 뭐해요....
          <br />
          에어팟 안 살꺼에요?
          <br />
        </h3>
        <StyledTextBtn>다른사람과 비교하러 가기>></StyledTextBtn>
        <br></br>
      </StyledText>
    </>
  );
};

export default ResultSave;
