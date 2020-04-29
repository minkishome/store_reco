import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../style";
import History from "./03History";
import { Link } from "react-router-dom";

const PriceResult: FunctionComponent<any> = ({}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <StyledText>
        <h1>에어팟 프로까지</h1>
        <img
          src="https://lh3.googleusercontent.com/proxy/zVXoulI_Czpq03KDSzQpjUhmy1b_tjnoUjzcnIZWsOe0goX5K0lYZcu0-rlfsDHDkCoSGXmARaqsDlCtbuMKUOYjtahUkb_7Vc0_1o3Xzl4CUK-8uxyy3h722b_5f3v1FQ"
          width="150"
        />
        <h1>100 원</h1>
        <h1>남았습니다.</h1>
        <br />
        <StyledTextBtn>다른 사람은 무엇을 사고 싶어할까요?</StyledTextBtn>
        <br />

        <h3>히스토리 보기</h3>
        <button onClick={() => setToggle(!toggle)}>▼</button>
        {toggle ? <History /> : <div></div>}
      </StyledText>
    </>
  );
};

export default PriceResult;
