import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";
import {Typography, Box} from '@material-ui/core';
const ResultSave: FunctionComponent<any> = ({}) => {
  const money: Number = 0;

  return (
    <>
      <StyledText>
        {/* <h3>
          오늘 하루 식비를
          <br />
          {money}원<br />
          더 쓰셨다는 사실
          <br />
          먹어서 뭐해요....
          <br />
          에어팟 안 살꺼에요?
          <br />
        </h3>
        <br></br> */}
        <Typography component = 'div'>
          <Box fontSize='3vw'>
          오늘 하루 식비를 <br/>
          {money}원<br />
          더 쓰셨다는 사실
          <br />
          먹어서 뭐해요....
          <br />
          에어팟 안 살꺼에요?
          </Box>

        </Typography>
      </StyledText>
    </>
  );
};

export default ResultSave;
