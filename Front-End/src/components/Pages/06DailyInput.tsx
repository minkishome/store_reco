import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledInput } from '../style';

const DailyInput: FunctionComponent<any> = ({ }) => {
  const total: Number = 0;
  return (
    <>
      <StyledText>
        <h3>나는 오늘 <select></select>에 <br />
          <StyledInput></StyledInput>원 썼어요</h3>
        <h2>총 합: {total}</h2>
      </StyledText>
    </>
  )
}

export default DailyInput;