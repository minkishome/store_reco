import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledInput } from "../style";

// 프로필 메뉴
// import ProfileMenu from "../UserPage/00ProfileMenu";

const MonthlyInput: FunctionComponent<any> = ({}) => {
  return (
    <>
      {/* <ProfileMenu /> */}
      <StyledText>
        <h3>
          나는 한달 평균 식비를 <br />
          <StyledInput></StyledInput>원 써요
        </h3>
      </StyledText>
    </>
  );
};

export default MonthlyInput;
