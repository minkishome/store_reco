import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";

const Survey: FunctionComponent<any> = ({}) => {
  return (
    <>
      <StyledText>
        <h1>Survey</h1>
        <h2>음식 취향이 비슷한 사람을 선택해주세요.</h2>

        <input type="radio" value="user1" />
        <h3>민기 | 떡볶이 햄버거 피자 치킨 짜장면 </h3>

        <input type="radio" value="user1" />
        <h3>은수 | 떡볶이 햄버거 피자 치킨 짜장면 </h3>

        <input type="radio" value="user1" />
        <h3>병학 | 떡볶이 햄버거 피자 치킨 짜장면 </h3>

        <input type="radio" value="user1" />
        <h3>수경 | 떡볶이 햄버거 피자 치킨 짜장면 </h3>

        <input type="radio" value="user1" />
        <h3>영지 | 떡볶이 햄버거 피자 치킨 짜장면 </h3>

        <StyledBtn>설문완료</StyledBtn>
      </StyledText>
    </>
  );
};

export default Survey;
