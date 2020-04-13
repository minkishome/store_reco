import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';

const Information: FunctionComponent<any> = ({}) => {
  return (
    <>
    <StyledText>
      <h1>회원정보</h1>
      <h2>프로필</h2>
      <hr />
      <h3>E-mail</h3>
      <h3>ssafy@naver.com</h3>
      <h3>이름</h3>
      <h3>홍수경</h3>
      <h3>닉네임</h3>
      <h3>뚜경뚜경</h3>
      <h3>거주지역</h3>
      <h3>서울 노원구</h3>
      <h3>한달 식비</h3>
      <h3>100 만원</h3>

      <hr />
      <h2>목표 상품</h2>
      <hr />
      <h3>목표 상품</h3>
      <input placeholder="에어팟 프로"></input>
      <h3>가격</h3>
      <input placeholder="1,000,000"></input>
      </StyledText>
    </>
  );
};

export default Information;
