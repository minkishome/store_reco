import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";

import ResultSave from "./07ResultSave";
import ResultFail from "./08ResultFail";

const dayCost = 10000;
const monthCost = 300000;

const ResultPage: FunctionComponent<any> = ({}) => {
  // 월수 계산하기
  // const money: Number = 0;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const monthDay = new Date(year, month, 0).getDate();

  var checkPoint = true; // 성공했으면 true

  const calResult = () => {
    if (monthCost / monthDay >= dayCost) {
      checkPoint = true;
    } else {
      checkPoint = false;
    }
  };

  if (checkPoint === true) {
    return (
      <>
        <StyledText>
          <h1>Result Page</h1>
          <ResultSave />
          <StyledTextBtn>다른사람과 비교하러 가기>></StyledTextBtn>
          <br></br>
        </StyledText>
      </>
    );
  } else {
    return (
      <>
        <StyledText>
          <h1>Result Page</h1>
          <ResultFail />
          <StyledTextBtn>다른사람과 비교하러 가기>></StyledTextBtn>
          <br></br>
        </StyledText>
      </>
    );
  }
};

export default ResultPage;
