import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';

const History: FunctionComponent<any> = ({}) => {
  return (
    <>
    <StyledText>
      <h1>MY HISTORY</h1>
      <div>
        <h2>날짜</h2>
        <h2>사용금액</h2>

        <h2>저축금액</h2>

        <h2>달성률</h2>
      </div>
      <hr />
      <h2>20 / 03 / 30</h2>
      <h2>10,000</h2>

      <h2>+ 500</h2>

      <h2>10 %</h2>
      <hr />
      <h2>합계</h2>
      <h2>10,000</h2>

      <h2>- 500</h2>

      <h2>10 %</h2>
      <hr />
      </StyledText>
    </>
  );
};

export default History;
