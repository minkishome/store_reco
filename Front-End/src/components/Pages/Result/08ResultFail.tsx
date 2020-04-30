import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../../style';
import {Typography, Box} from '@material-ui/core';


const ResultFail: FunctionComponent<any> = ({ }) => {
  const money: Number = 0;
  return (
    <>
      <StyledText>


        <Typography component = 'div'>
          <Box fontSize='3vw'>
          오늘 하루 식비를<br />
          {money}원<br />
          아끼셨네요<br />
          먹어서 뭐해요!!<br />
          남는건 에어팟인데!<br />
          </Box>

        </Typography>
      </StyledText>
      
    </>
  )
}

export default ResultFail;