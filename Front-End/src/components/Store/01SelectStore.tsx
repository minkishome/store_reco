import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from '../style';

const SelectStore: FunctionComponent<any> = ({ }) => {
  return (
    <>
      <StyledText>
        <h1>결과를 바탕으로</h1>
        <h1>맛집을 추천해드릴게요</h1>
        <br></br>

        <StyledBtn>카페</StyledBtn>
        
        <StyledBtn>음식점</StyledBtn>
      </StyledText>
    </>
  );
};

export default SelectStore;
