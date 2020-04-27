import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../../style';

const ResultFail: FunctionComponent<any> = ({ }) => {
  const money: Number = 0;
  return (
    <>
      <StyledText>

        <h3>오늘 하루 식비를<br />
          {money}원<br />
                아끼셨네요<br />
                먹어서 뭐해요!!<br />
                남는건 에어팟인데!<br />
        </h3>
      </StyledText>
    </>
  )
}

export default ResultFail;