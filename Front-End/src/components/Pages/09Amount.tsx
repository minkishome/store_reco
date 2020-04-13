import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../style';

const Amount: FunctionComponent<any> = ({ }) => {
  const money: Number = 0;
  const date: Number = 0;
  return (
    <>
      <StyledText>
        <img src='https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/269056d2-2466-4aff-bd5f-f6c6f908bbe6.jpeg'
        width='200px'
        height='200px'
         />
        <h3>에어팟까지 남은 금액<br />
          {money}원<br />
          <hr />
                현재 속도로 에어팟까지 걸리는<br />
                시간은 {date}일 입니다<br />
        </h3>
        <StyledTextBtn>다른 사람은 무엇을 사고 싶어할까요?</StyledTextBtn>
      </StyledText>
    </>
  )
}

export default Amount;