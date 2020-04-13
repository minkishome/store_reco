import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledBtn } from '../style';


const Service: FunctionComponent<any> = ({ }) => {
  return (
    <>
      <StyledText>

        <h2>OOOO건의 빅데이터를 활용해<br />
        여러분의 소비를 비교/분석 해드려요.<br />
        식비 맞춤형 맛집도 추천해드립니다.<br />
        회원가입을 하면 더 많은 서비스를<br />
            이용하실 수 있어요</h2>
        <StyledBtn>회원가입 하러가기</StyledBtn>
        <StyledBtn>그냥 볼래요</StyledBtn>
      </StyledText>
    </>
  )
}



export default Service;