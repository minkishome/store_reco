import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from '../style';


const StoreDetail: FunctionComponent<any> = ({}) => {
  return (
    <>
    <StyledText>
      <h3>고갯마루
        <br />
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMDhfMSAg%2FMDAxNDgzODAyNDIwNzg4.5sRLucgny06iqQ_RBdwnaVtWIVnBvc-Lxsa__Lfc2aMg.-gHlR0au-otgL13tqbKoRoeYvcDl7i_9zp3JslOw_nsg.JPEG.39274520%2FDSC03488.JPG&type=b400"
        alt="고갯마루"
        width="200"
      />
      <br />
      역삼역<br />
      02-0000-0000</h3>
      <StyledBtn>더 알아보기</StyledBtn>
      <hr />
      <h4>Review</h4>
      <h5>완전쫀맛탱탱탱탱</h5>
      </StyledText>
    </>
  );
};

export default StoreDetail;
