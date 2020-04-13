import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';

const Recommand: FunctionComponent<any> = ({}) => {
  return (
    <>
    <StyledText>
      <h3>오늘 쓴 금액보다 </h3>
      <h3> 저렴하게 먹을 수 있는 곳이에요</h3>
      <br />
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMDhfMSAg%2FMDAxNDgzODAyNDIwNzg4.5sRLucgny06iqQ_RBdwnaVtWIVnBvc-Lxsa__Lfc2aMg.-gHlR0au-otgL13tqbKoRoeYvcDl7i_9zp3JslOw_nsg.JPEG.39274520%2FDSC03488.JPG&type=b400"
        alt=""
        width="200px"
      />
      <h4>고갯마루</h4>
      </StyledText>
    </>
  );
};

export default Recommand;
